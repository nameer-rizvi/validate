import { type ValidationOptions } from "./interfaces.js";
import validateMin from "./validate.min.js";
import * as utilN from "@nameer/utils";

function validateMinLength({ label, value, ...rest }: ValidationOptions): void {
  if (utilN.isStringOrArray(value)) {
    const thing = utilN.isString(value) ? "characters" : "items";
    const label2 = `${label}${utilN.delimiter}${thing}`;
    validateMin({ label: label2, value: value.length, ...rest });
  }
}

export default validateMinLength;
