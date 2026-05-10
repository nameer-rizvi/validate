import { type ValidationOptions } from "./interfaces.js";
import validateMin from "./validate.min.js";
import * as utilN from "@nameer/utils";

function validateMinWords({ label, value, ...rest }: ValidationOptions): void {
  if (utilN.isString(value)) {
    const label2 = `${label}${utilN.delimiter}words`;
    const value2 = utilN.stringLength.word(value);
    validateMin({ label: label2, value: value2, ...rest });
  }
}

export default validateMinWords;
