import { type ValidationOptions } from "./interfaces.js";
import validateMinLength from "./validate.minLength.js";
import * as utilN from "@nameer/utils";

function validateMinLengthValueArray({
  label,
  value: values,
  ...rest
}: ValidationOptions): void {
  if (utilN.isArray(values)) {
    for (const value of values) {
      validateMinLength({ label: `${label}: "${value}"`, value, ...rest });
    }
  }
}

export default validateMinLengthValueArray;
