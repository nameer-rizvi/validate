import { type ValidationOptions } from "./interfaces.js";
import validateMin from "./validate.min.js";
import * as utilN from "@nameer/utils";

function validateMinValueArray({
  label,
  value: values,
  ...rest
}: ValidationOptions): void {
  if (utilN.isArray(values)) {
    for (const value of values) {
      validateMin({ label: `${label}: "${value}"`, value, ...rest });
    }
  }
}

export default validateMinValueArray;
