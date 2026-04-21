import { type RegexRule, type ValidationOptions } from "./interfaces.js";
import * as utils from "@nameer/utils";
import safeR from "safe-regex";

const resolver: Record<string, RegexRule> = {
  alphaNumeric: {
    r: /^[A-Za-z0-9]+$/,
    warning: "can only contain letters and numbers",
    trusted: true,
  },
  countryCode: {
    r: /^[A-Z]{2}$/,
    warning: "must be a 2-letter country code",
    trusted: true,
  },
  creditCard: {
    r: /^\d{13,19}$/,
    warning: "must be a valid credit card number",
    trusted: true,
  },
  currencyAmount: {
    r: /^\d+(?:\.\d{2})?$/,
    warning: "must be a valid currency amount",
    trusted: true,
  },
  displayName: {
    r: /^[A-Za-z0-9]+(?:[ '-][A-Za-z0-9]+)*$/,
    warning: "contains invalid characters",
    trusted: true,
  },
  email: {
    r: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
    warning: "must be properly formatted",
    trusted: true,
  },
  hexColor: {
    r: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    warning: "must be a valid hex color",
    trusted: true,
  },
  isoDate: {
    r: /^\d{4}-\d{2}-\d{2}$/,
    warning: "must be a valid ISO 8601 date (YYYY-MM-DD)",
    trusted: true,
  },
  ipv4: {
    r: /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
    warning: "must be a valid IPv4 address",
    trusted: true,
  },
  noEmoji: {
    r: /^[\p{L}\p{N}\p{P}\p{Z}]+$/u,
    warning: "cannot contain emojis",
    trusted: true,
  },
  noHtml: {
    r: /^[^<>]+$/,
    warning: "cannot contain HTML",
    trusted: true,
  },
  noSpecialChar: {
    r: /^[A-Za-z0-9_]+$/,
    warning: "can only contain letters, numbers, and '_'",
    trusted: true,
  },
  noWhitespace: {
    r: /^\S+$/,
    warning: "can't include any spaces",
    trusted: true,
  },
  onlyLetters: {
    r: /^[a-zA-Z]+$/,
    warning: "can only contain letters",
    trusted: true,
  },
  onlyNumbers: {
    r: /^\d+$/,
    warning: "can only contain numbers",
    trusted: true,
  },
  phoneNumber: {
    r: /^\+?[1-9]\d{9,14}$/,
    warning: "must be a valid phone number",
    trusted: true,
  },
  pinCode: {
    r: /^\d{4,6}$/,
    warning: "must be 4 to 6 digits",
    trusted: true,
  },
  postalCodeCA: {
    r: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    warning: "must be a valid Canadian postal code",
    trusted: true,
  },
  postalCodeUS: {
    r: /^\d{5}(-\d{4})?$/,
    warning: "must be a valid US ZIP code",
    trusted: true,
  },
  slug: {
    r: /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i,
    warning: "must be lowercase and hyphen-separated",
    trusted: true,
  },
  ssn: {
    r: /^\d{3}-\d{2}-\d{4}$/,
    warning: "must be a valid Social Security Number (XXX-XX-XXXX)",
    trusted: true,
  },
  strongPassword: {
    r: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
    warning: `must include at least one of the following: uppercase character, lowercase character, number, and special character`,
    trusted: true,
  },
  time12h: {
    r: /^(0?[1-9]|1[0-2]):[0-5]\d\s?(am|pm)$/i,
    warning: "must be a valid 12-hour time (e.g. 1:30 pm)",
    trusted: true,
  },
  time24h: {
    r: /^([01]\d|2[0-3]):([0-5]\d)$/,
    warning: "must be a valid 24-hour time (e.g. 13:30)",
    trusted: true,
  },
  trimmed: {
    r: /^\S(?:.*\S)?$/,
    warning: "cannot start or end with whitespace",
    trusted: true,
  },
  urlString: {
    r: /^(https?:\/\/)?([^\s.]+\.[^\s]{2,}|localhost[:\d]*)\S*$/i,
    warning: "must be a valid URL",
    trusted: true,
  },
  username: {
    r: /^[a-zA-Z][a-zA-Z0-9_]{2,29}$/,
    warning: "must start with a letter and be 3–30 characters",
    trusted: true,
  },
  uuidV4: {
    r: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    warning: "must be a valid UUID v4",
    trusted: true,
  },
  website: {
    r: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/\S*)?$/,
    warning: "must be a valid website",
    trusted: true,
  },
};

function validateRegex({ label, setting, value }: ValidationOptions): void {
  if (utils.isString(value) && utils.isArray(setting)) {
    for (const rule of setting) {
      const config: RegexRule | undefined =
        typeof rule === "string" ? resolver[rule] : (rule as RegexRule);

      if (!utils.isObject(config)) {
        throw new Error(
          `Regex config for rule ("${String(rule)}") is undefined.`,
        );
      }

      if (config.trusted !== true && !safeR(config.r)) {
        throw new Error(`Unsafe regex detected for rule ("${String(rule)}").`);
      }

      if (!config.r.test(value)) {
        throw new Error(`${label} ${config.warning ?? "is invalid"}.`);
      }
    }
  }
}

export default validateRegex;
