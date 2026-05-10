import { type ValidationOptions } from "./interfaces.js";
import * as utilN from "@nameer/utils";

const resolver = {
  array: utilN.isArray,
  arrayNonEmpty: utilN.isArrayNonEmpty,
  arrayOrString: utilN.isArrayOrString,
  base64: utilN.isBase64,
  boolean: utilN.isBoolean,
  booleanAny: utilN.isBooleanAny,
  booleanNumber: utilN.isBooleanNumber,
  booleanString: utilN.isBooleanString,
  creditCardNumber: utilN.isCreditCardNumber,
  date: utilN.isDate,
  email: utilN.isEmail,
  error: utilN.isError,
  function: utilN.isFunction,
  http: utilN.isHttp,
  json: utilN.isJson,
  jsonString: utilN.isJsonString,
  jwt: utilN.isJwt,
  module: utilN.isModule,
  number: utilN.isNumber,
  numberString: utilN.isNumberString,
  numberValid: utilN.isNumberValid,
  numeric: utilN.isNumeric,
  object: utilN.isObject,
  objectNonEmpty: utilN.isObjectNonEmpty,
  phoneNumber: utilN.isPhoneNumber,
  regex: utilN.isRegex,
  string: utilN.isString,
  stringNonEmpty: utilN.isStringNonEmpty,
  stringOrArray: utilN.isArrayOrString,
  stringSafe: utilN.isStringSafeRegex,
  url: utilN.isUrl,
  urlString: utilN.isUrlString,
  valid: utilN.isValid,
} as const;

function validateType({ label, setting, value }: ValidationOptions): void {
  if (utilN.isString(setting)) {
    const guard = resolver[setting as keyof typeof resolver];
    if ((!guard && typeof value !== setting) || !guard(value)) {
      throw new Error(`${label} is not type: ${setting}.`);
    }
  }
}

export default validateType;
