import DOMPurify from "isomorphic-dompurify";

/*
 * --> Types
 */

export type DefinitionMap = Map<string, Definition>;

export type DOMPurifyConfig = Omit<
  Parameters<typeof DOMPurify.sanitize>[1] & object,
  "RETURN_TRUSTED_TYPE"
>;

export type PayloadObject = Record<string, unknown>;

export type RegexRule = { r: RegExp; warning?: string; trusted?: boolean };

export type RegexRuleName =
  | "alphaNumeric"
  | "countryCode"
  | "creditCard"
  | "currencyAmount"
  | "displayName"
  | "email"
  | "hexColor"
  | "isoDate"
  | "ipv4"
  | "noEmoji"
  | "noHtml"
  | "noSpecialChar"
  | "noWhitespace"
  | "onlyLetters"
  | "onlyNumbers"
  | "phoneNumber"
  | "pinCode"
  | "postalCodeCA"
  | "postalCodeUS"
  | "slug"
  | "ssn"
  | "strongPassword"
  | "time12h"
  | "time24h"
  | "trimmed"
  | "urlString"
  | "username"
  | "uuidV4"
  | "website";

export type RequiredList = readonly string[];

export type StringOrArray<T = string> = T | readonly T[];

export type ValidationResolver = Record<
  string,
  (options: ValidationOptions) => void
>;

export type ValueType =
  | "array"
  | "arrayNonEmpty"
  | "arrayOrString"
  | "base64"
  | "boolean"
  | "booleanAny"
  | "booleanNumber"
  | "booleanString"
  | "creditCardNumber"
  | "date"
  | "email"
  | "error"
  | "function"
  | "http"
  | "json"
  | "jsonString"
  | "jwt"
  | "module"
  | "number"
  | "numberString"
  | "numberValid"
  | "numeric"
  | "object"
  | "objectNonEmpty"
  | "phoneNumber"
  | "regex"
  | "string"
  | "stringNonEmpty"
  | "stringOrArray"
  | "stringSafe"
  | "url"
  | "urlString"
  | "valid";

/*
 * --> Interfaces
 */

export interface Definition {
  readonly key: string;
  readonly label?: string;
  readonly ignoreSanitizer?: boolean;
  readonly ignoreSanitizerValidation?: boolean;
  readonly domPurifyOptions?: DOMPurifyConfig;
  readonly blacklist?: StringOrArray;
  readonly blacklistKeys?: StringOrArray;
  readonly match?: string;
  readonly max?: number;
  readonly maxLength?: number;
  readonly maxLengthArray?: number;
  readonly maxLengthString?: number;
  readonly maxLengthHtml?: number;
  readonly maxLengthValueArray?: number;
  readonly maxLengthValueObject?: number;
  readonly maxValueArray?: number;
  readonly maxValueObject?: number;
  readonly maxWords?: number;
  readonly maxWordsHtml?: number;
  readonly min?: number;
  readonly minLength?: number;
  readonly minLengthArray?: number;
  readonly minLengthString?: number;
  readonly minLengthHtml?: number;
  readonly minLengthValueArray?: number;
  readonly minLengthValueObject?: number;
  readonly minValueArray?: number;
  readonly minValueObject?: number;
  readonly minWords?: number;
  readonly minWordsHtml?: number;
  readonly regex?: ReadonlyArray<RegexRule | RegexRuleName>;
  readonly type?: ValueType;
  readonly typeValueArray?: ValueType;
  readonly typeValueObject?: ValueType;
  readonly whitelist?: StringOrArray;
  readonly whitelistKeys?: StringOrArray;
}

export interface Options {
  readonly custom?: ValidationResolver;
  readonly domPurifyOptions?: DOMPurifyConfig;
}

export interface ValidationOptions {
  readonly setting: unknown;
  readonly value: unknown;
  readonly label: string;
  readonly match?: unknown;
  readonly matchLabel?: string;
}
