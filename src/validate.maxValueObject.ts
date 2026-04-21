import { type ValidationOptions } from "./interfaces.js";
import validateMax from "./validate.max.js";
import * as utils from "@nameer/utils";

function validateMaxValueObject({
  label,
  value,
  ...rest
}: ValidationOptions): void {
  if (utils.isObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      validateMax({ label: `${label}: "${k}"`, value: v, ...rest });
    }
  }
}

export default validateMaxValueObject;
