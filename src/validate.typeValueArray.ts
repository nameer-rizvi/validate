import { type ValidationOptions } from "./interfaces.js";
import validateType from "./validate.type.js";
import * as utils from "@nameer/utils";

function validateTypeValueArray({
  label,
  value: values,
  ...rest
}: ValidationOptions): void {
  if (utils.isArray(values)) {
    for (const value of values) {
      validateType({ label: `${label}: "${value}"`, value, ...rest });
    }
  }
}

export default validateTypeValueArray;
