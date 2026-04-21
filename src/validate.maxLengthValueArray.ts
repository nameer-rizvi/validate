import { type ValidationOptions } from "./interfaces.js";
import validateMaxLength from "./validate.maxLength.js";
import * as utils from "@nameer/utils";

function validateMaxLengthValueArray({
  label,
  value: values,
  ...rest
}: ValidationOptions): void {
  if (utils.isArray(values)) {
    for (const value of values) {
      validateMaxLength({ label: `${label}: "${value}"`, value, ...rest });
    }
  }
}

export default validateMaxLengthValueArray;
