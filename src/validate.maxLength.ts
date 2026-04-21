import { type ValidationOptions } from "./interfaces.js";
import validateMax from "./validate.max.js";
import * as utils from "@nameer/utils";

function validateMaxLength({ label, value, ...rest }: ValidationOptions): void {
  if (utils.isArrayOrString(value)) {
    const thing = utils.isString(value) ? "characters" : "items";
    const label2 = `${label}${utils.delimiter}${thing}`;
    validateMax({ label: label2, value: value.length, ...rest });
  }
}

export default validateMaxLength;
