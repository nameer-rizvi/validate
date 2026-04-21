// todo
import { ValidationOptions } from "./interfaces";
import validateMin from "./validate.min";
import * as utils from "@nameer/utils";

function validateMinValueArray({
  label,
  value: values,
  ...rest
}: ValidationOptions) {
  if (utils.isArray(values)) {
    for (const value of values) {
      validateMin({ label: `${label}: "${value}"`, value, ...rest });
    }
  }
}

export default validateMinValueArray;
