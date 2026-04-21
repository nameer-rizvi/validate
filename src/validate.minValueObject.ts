import { type ValidationOptions } from "./interfaces.js";
import validateMin from "./validate.min.js";
import * as utils from "@nameer/utils";

function validateMinValueObject({
  label,
  value,
  ...rest
}: ValidationOptions): void {
  if (utils.isObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      validateMin({ label: `${label}: "${k}"`, value: v, ...rest });
    }
  }
}

export default validateMinValueObject;
