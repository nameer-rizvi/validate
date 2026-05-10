import { type ValidationOptions } from "./interfaces.js";
import validateMax from "./validate.max.js";
import * as utilN from "@nameer/utils";

function validateMaxLength({ label, value, ...rest }: ValidationOptions): void {
  if (utilN.isArrayOrString(value)) {
    const thing = utilN.isString(value) ? "characters" : "items";
    const label2 = `${label}${utilN.delimiter}${thing}`;
    validateMax({ label: label2, value: value.length, ...rest });
  }
}

export default validateMaxLength;
