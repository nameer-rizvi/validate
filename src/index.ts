import {
  type Definition,
  type Options,
  type DefinitionMap,
  type ValidationResolver,
  type PayloadObject,
  type RequiredList,
} from "./interfaces.js";
import * as utils from "@nameer/utils";
import sanitized from "sanitized";
import * as stringStripHtml from "string-strip-html";
import validateIndex from "./validate.index.js";

/**
 * Creates a validator function from a definition dictionary.
 * Validation is fail-fast — the first failure throws an error.
 * Each key in the payload must have a corresponding definition in the dictionary.
 * On each call, the validator:
 * 1. Validates each value against its definition rules.
 * 2. Sanitizes string values in place using DOMPurify.
 * 3. Checks that all required keys are present and non-empty.
 * @example
 * const validate = initializer([
 *   { key: "name", type: "string", maxLength: 50 },
 *   { key: "email", type: "email" },
 * ]);
 *
 * validate({ name: "John", email: "john@example.com" }, ["name", "email"]);
 *
 * // Throws on invalid value:
 * validate({ name: 123, email: "john@example.com" });
 *
 * // Throws on missing required key:
 * validate({ name: "", email: "john@example.com" }, ["name"]);
 *
 * // Throws on dirty value:
 * validate({ name: "<script>alert(1)</script>" });
 *
 * // With custom validator:
 * const validate = initializer(
 *   [{ key: "name", type: "string", myCustomRule: true }],
 *   { custom: { myCustomRule: ({ value }) => { if (value !== "foo") throw new Error("Must be foo"); } } }
 * );
 */
function initializer(dictionary: Definition[], option: Options = {}) {
  const defMap: DefinitionMap = new Map();

  for (const definition of dictionary) {
    if (typeof definition === "object" && definition !== null) {
      const label = definition.label || definition.key || "";
      defMap.set(definition.key, Object.freeze({ ...definition, label }));
    }
  }

  const validationResolver: ValidationResolver = Object.freeze({
    ...validateIndex,
    ...option.custom,
  });

  return function validator(payload?: PayloadObject, required?: RequiredList) {
    if (!utils.isObject(payload)) return;

    for (const [key, value] of Object.entries(payload)) {
      const definition = getDefinition(defMap, key);

      if (utils.isValid(value)) {
        for (const [name, setting] of Object.entries(definition)) {
          const validation = validationResolver[name];

          if (validation === undefined) continue;

          let matchV: unknown;
          let matchD: Definition | undefined;

          if (name === "match" && utils.isString(setting)) {
            matchV = payload[setting];
            matchD = getDefinition(defMap, setting);
          }

          validation({
            setting,
            value,
            label: definition.label || "",
            match: matchV,
            matchLabel: matchD?.label,
          });
        }
      }

      if (definition.ignoreSanitizer !== true) {
        const options = definition.domPurifyOptions ?? option.domPurifyOptions;

        const sanitizedValue = sanitized(value, options);

        if (definition.ignoreSanitizerValidation !== true) {
          if (JSON.stringify(value) !== JSON.stringify(sanitizedValue)) {
            throw new Error(`${definition.label} is a dirty value.`);
          }
        }

        payload[key] = sanitizedValue;
      }
    }

    for (const requiredKey of required ?? []) {
      const value = payload[requiredKey];

      const isValue = utils.isString(value)
        ? requiredKey.toLowerCase().includes("html") ||
          requiredKey.toLowerCase().includes("rich_text") ||
          requiredKey.toLowerCase().includes("richtext")
          ? stringStripHtml.stripHtml(value).result.trim().length > 0
          : value.trim().length > 0
        : utils.isValid(value);

      if (isValue === false) {
        const definition = getDefinition(defMap, requiredKey);
        throw new Error(`${definition.label} is required.`);
      }
    }
  };
}

function getDefinition(defMap: DefinitionMap, key: string): Definition {
  const definition = defMap.get(key);
  if (!definition) throw new Error(`Definition with key ("${key}") not found.`);
  return definition;
}

export default initializer;
