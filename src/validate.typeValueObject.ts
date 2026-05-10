import { type ValidationOptions } from "./interfaces.js";
import validateType from "./validate.type.js";
import * as utilN from "@nameer/utils";

function validateTypeValueObject({
  label,
  value,
  ...rest
}: ValidationOptions): void {
  if (utilN.isObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      validateType({ label: `${label}: "${k}"`, value: v, ...rest });
    }
  }
}

export default validateTypeValueObject;
