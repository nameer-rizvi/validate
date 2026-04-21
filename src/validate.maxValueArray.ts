import { type ValidationOptions } from "./interfaces.js";
import validateMax from "./validate.max.js";
import * as utils from "@nameer/utils";

function validateMaxValueArray({
  label,
  value: values,
  ...rest
}: ValidationOptions): void {
  if (utils.isArray(values)) {
    for (const value of values) {
      validateMax({ label: `${label}: "${value}"`, value, ...rest });
    }
  }
}

export default validateMaxValueArray;
