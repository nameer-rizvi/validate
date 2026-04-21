// todo
import { ValidationOptions } from "./interfaces";
import validateWhitelist from "./validate.whitelist";
import * as utils from "@nameer/utils";

function validateWhitelistKeys({ value, ...rest }: ValidationOptions) {
  try {
    if (utils.isObject(value)) {
      validateWhitelist({ value: Object.keys(value), ...rest });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(message.replace("value", "key").trim(), { cause: err });
  }
}

export default validateWhitelistKeys;
