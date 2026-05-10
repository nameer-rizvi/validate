import { type ValidationOptions } from "./interfaces.js";
import validateMax from "./validate.max.js";
import * as utilN from "@nameer/utils";

function validateMaxWords({ label, value, ...rest }: ValidationOptions): void {
  if (utilN.isString(value)) {
    const label2 = `${label}${utilN.delimiter}words`;
    const value2 = utilN.stringLength.word(value);
    validateMax({ label: label2, value: value2, ...rest });
  }
}

export default validateMaxWords;
