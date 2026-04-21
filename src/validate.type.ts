import { type ValidationOptions } from "./interfaces.js";
import * as utils from "@nameer/utils";

const resolver = {
  array: utils.isArray,
  arrayNonEmpty: utils.isArrayNonEmpty,
  arrayOrString: utils.isArrayOrString,
  base64: utils.isBase64,
  boolean: utils.isBoolean,
  booleanAny: utils.isBooleanAny,
  booleanNumber: utils.isBooleanNumber,
  booleanString: utils.isBooleanString,
  creditCardNumber: utils.isCreditCardNumber,
  date: utils.isDate,
  email: utils.isEmail,
  error: utils.isError,
  function: utils.isFunction,
  http: utils.isHttp,
  json: utils.isJson,
  jsonString: utils.isJsonString,
  jwt: utils.isJwt,
  module: utils.isModule,
  number: utils.isNumber,
  numberString: utils.isNumberString,
  numberValid: utils.isNumberValid,
  numeric: utils.isNumeric,
  object: utils.isObject,
  objectNonEmpty: utils.isObjectNonEmpty,
  phoneNumber: utils.isPhoneNumber,
  regex: utils.isRegex,
  string: utils.isString,
  stringNonEmpty: utils.isStringNonEmpty,
  stringOrArray: utils.isArrayOrString,
  stringSafe: utils.isStringSafeRegex,
  url: utils.isUrl,
  urlString: utils.isUrlString,
  valid: utils.isValid,
} as const;

function validateType({ label, setting, value }: ValidationOptions): void {
  if (utils.isString(setting)) {
    const guard = resolver[setting as keyof typeof resolver];
    if ((!guard && typeof value !== setting) || !guard(value)) {
      throw new Error(`${label} is not type: ${setting}.`);
    }
  }
}

export default validateType;
