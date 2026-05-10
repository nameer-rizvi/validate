import { type ValidationOptions } from "./interfaces.js";
import validateWhitelist from "./validate.whitelist.js";
import * as utilN from "@nameer/utils";

function validateWhitelistKeys({ value, ...rest }: ValidationOptions): void {
  try {
    if (utilN.isObject(value)) {
      validateWhitelist({ value: Object.keys(value), ...rest });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(message.replace("value", "key").trim(), { cause: err });
  }
}

export default validateWhitelistKeys;
