import { type ValidationOptions } from "./interfaces.js";
import validateMinLength from "./validate.minLength.js";
import * as utils from "@nameer/utils";

function validateMinLengthValueObject({
  label,
  value,
  ...rest
}: ValidationOptions): void {
  if (utils.isObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      validateMinLength({ label: `${label}: "${k}"`, value: v, ...rest });
    }
  }
}

export default validateMinLengthValueObject;
