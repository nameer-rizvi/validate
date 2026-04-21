import { type ValidationOptions } from "./interfaces.js";
import validateBlacklist from "./validate.blacklist.js";
import * as utils from "@nameer/utils";

function validateBlacklistKeys({ value, ...rest }: ValidationOptions): void {
  try {
    if (utils.isObject(value)) {
      validateBlacklist({ value: Object.keys(value), ...rest });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(message.replace("term", "key").trim(), { cause: err });
  }
}

export default validateBlacklistKeys;
