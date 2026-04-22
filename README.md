# @nameer/validate

An opinionated, fail-fast validation middleware designed for back-end safety, predictability, and performance.

Rather than attempting to be flexible or UI-friendly, `@nameer/validate` prioritizes strict server-side validation, deterministic behavior, and clear guarantees at the API boundary.

## Installation

```bash
npm install @nameer/validate
# or
yarn add @nameer/validate
```

## Usage

```javascript
const validate = require("@nameer/validate"); // commonjs
// or
import validate from "@nameer/validate"; // esm
```

Provide a dictionary of definitions to create a validator, then call it with a payload:

```javascript
const validator = validate([
  { key: "name", label: "Name", type: "string", maxLength: 50 },
  { key: "email", label: "Email", type: "email" },
]);

validator({ name: "Nameer", email: "nameer@example.com" }, ["name", "email"]);
```

Validation is fail-fast — the first failure throws an `Error`. Use a `try/catch` to handle failures:

```javascript
try {
  validator(payload, requiredKeys);
} catch (error) {
  console.error(error.message); // e.g. "Email must be properly formatted."
}
```

## How It Works

On each call, the validator runs three steps in order:

1. **Validate** — each value in the payload is checked against its definition rules.
2. **Sanitize** — string values, including nested ones in arrays or objects, are sanitized in place using DOMPurify. Dirty values (those that change after sanitization) throw an error.
3. **Check required** — verifies that all keys in the `required` list are present and non-empty after sanitization.

## Dictionary

Each entry in the dictionary defines the validation rules for a payload key. Every key present in the payload must have a corresponding definition — unknown keys will throw.

```javascript
const dictionary = [
  {
    key: "name", // required - must match the payload key
    label: "Name", // optional - used in error messages (defaults to key)
    type: "string",
    maxLength: 50,
  },
];
```

## Options

An optional second argument can be passed to `validate()` to provide global settings:

```javascript
const validator = validate(dictionary, {
  domPurifyOptions: { ALLOWED_TAGS: ["b", "i"] },
  custom: {
    myCustomRule: ({ value, setting, label }) => {
      if (value !== setting) throw new Error(`${label} is invalid.`);
    },
  },
});
```

| Option             | Type     | Description                                               |
| ------------------ | -------- | --------------------------------------------------------- |
| `domPurifyOptions` | `object` | DOMPurify config applied globally to all sanitized values |
| `custom`           | `object` | Custom validation functions keyed by rule name            |

## Definition Options

| Option                      | Type                             | Description                                        |
| --------------------------- | -------------------------------- | -------------------------------------------------- |
| `key`                       | `string`                         | Payload key this definition applies to             |
| `label`                     | `string`                         | Label used in error messages (defaults to `key`)   |
| `ignoreSanitizer`           | `boolean`                        | Skip sanitization for this field                   |
| `ignoreSanitizerValidation` | `boolean`                        | Sanitize but don't throw on dirty values           |
| `domPurifyOptions`          | `object`                         | DOMPurify config for this field (overrides global) |
| `type`                      | `ValueType`                      | Type guard to apply to the value                   |
| `min`                       | `number`                         | Minimum numeric value                              |
| `max`                       | `number`                         | Maximum numeric value                              |
| `minLength`                 | `number`                         | Minimum length for strings or arrays               |
| `maxLength`                 | `number`                         | Maximum length for strings or arrays               |
| `minLengthString`           | `number`                         | Minimum character length for strings               |
| `maxLengthString`           | `number`                         | Maximum character length for strings               |
| `minLengthArray`            | `number`                         | Minimum item count for arrays                      |
| `maxLengthArray`            | `number`                         | Maximum item count for arrays                      |
| `minLengthHtml`             | `number`                         | Minimum character length after stripping HTML      |
| `maxLengthHtml`             | `number`                         | Maximum character length after stripping HTML      |
| `minLengthValueArray`       | `number`                         | Minimum length of each string in an array          |
| `maxLengthValueArray`       | `number`                         | Maximum length of each string in an array          |
| `minLengthValueObject`      | `number`                         | Minimum length of each string value in an object   |
| `maxLengthValueObject`      | `number`                         | Maximum length of each string value in an object   |
| `minValueArray`             | `number`                         | Minimum numeric value for each item in an array    |
| `maxValueArray`             | `number`                         | Maximum numeric value for each item in an array    |
| `minValueObject`            | `number`                         | Minimum numeric value for each value in an object  |
| `maxValueObject`            | `number`                         | Maximum numeric value for each value in an object  |
| `minWords`                  | `number`                         | Minimum word count for strings                     |
| `maxWords`                  | `number`                         | Maximum word count for strings                     |
| `minWordsHtml`              | `number`                         | Minimum word count after stripping HTML            |
| `maxWordsHtml`              | `number`                         | Maximum word count after stripping HTML            |
| `typeValueArray`            | `ValueType`                      | Type guard applied to each item in an array        |
| `typeValueObject`           | `ValueType`                      | Type guard applied to each value in an object      |
| `regex`                     | `RegexRuleName[] \| RegexRule[]` | One or more regex rules to test against the value  |
| `match`                     | `string`                         | Key of another field the value must match          |
| `blacklist`                 | `string \| string[]`             | Terms the value must not contain                   |
| `blacklistKeys`             | `string \| string[]`             | Keys an object value must not contain              |
| `whitelist`                 | `string \| string[]`             | The only acceptable values                         |
| `whitelistKeys`             | `string \| string[]`             | The only acceptable keys for an object value       |

## Type Options

The `type` field accepts any of the following:

`array`, `arrayNonEmpty`, `arrayOrString`, `base64`, `boolean`, `booleanAny`, `booleanNumber`, `booleanString`, `creditCardNumber`, `date`, `email`, `error`, `function`, `http`, `json`, `jsonString`, `jwt`, `module`, `number`, `numberString`, `numberValid`, `numeric`, `object`, `objectNonEmpty`, `phoneNumber`, `regex`, `string`, `stringNonEmpty`, `stringOrArray`, `stringSafe`, `url`, `urlString`, `valid`

## Regex Options

The `regex` field accepts an array of named rules or custom `RegexRule` objects (`{ r: RegExp, warning?: string }`).

Named rules: `alphaNumeric`, `countryCode`, `creditCard`, `currencyAmount`, `displayName`, `email`, `hexColor`, `isoDate`, `ipv4`, `noEmoji`, `noHtml`, `noSpecialChar`, `noWhitespace`, `onlyLetters`, `onlyNumbers`, `phoneNumber`, `pinCode`, `postalCodeCA`, `postalCodeUS`, `slug`, `ssn`, `strongPassword`, `time12h`, `time24h`, `trimmed`, `urlString`, `username`, `uuidV4`, `website`

```javascript
// Named rule:
{ key: "username", regex: ["username"] }

// Custom rule:
{ key: "code", regex: [{ r: /^[A-Z]{4}$/, warning: "must be 4 uppercase letters" }] }
```

## Philosophy

`@nameer/validate` is designed around three core principles:

**Fail-fast** — validation stops at the first failure and throws immediately, keeping control flow simple and avoiding unnecessary work on invalid payloads.

**Exhaustive dictionaries** — every key in the payload must have a definition. Unknown fields are not silently accepted, making validation behavior explicit, auditable, and predictable.

**Mutation-based sanitization** — sanitization mutates the original payload in place rather than returning a new object, avoiding unnecessary allocations and keeping middleware signatures clean.

## License

MIT
