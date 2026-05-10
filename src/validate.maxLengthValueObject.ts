import { type ValidationOptions } from "./interfaces.js";
import validateMaxLength from "./validate.maxLength.js";
import * as utilN from "@nameer/utils";

function validateMaxLengthValueObject({
  label,
  value,
  ...rest
}: ValidationOptions): void {
  if (utilN.isObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      validateMaxLength({ label: `${label}: "${k}"`, value: v, ...rest });
    }
  }
}

export default validateMaxLengthValueObject;
