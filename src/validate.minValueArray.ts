import { type ValidationOptions } from "./interfaces.js";
import validateMin from "./validate.min.js";
import * as utils from "@nameer/utils";

function validateMinValueArray({
  label,
  value: values,
  ...rest
}: ValidationOptions): void {
  if (utils.isArray(values)) {
    for (const value of values) {
      validateMin({ label: `${label}: "${value}"`, value, ...rest });
    }
  }
}

export default validateMinValueArray;
