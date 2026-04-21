import { type ValidationOptions } from "./interfaces.js";
import validateMax from "./validate.max.js";
import * as utils from "@nameer/utils";

function validateMaxWords({ label, value, ...rest }: ValidationOptions): void {
  if (utils.isString(value)) {
    const label2 = `${label}${utils.delimiter}words`;
    const value2 = utils.stringLength.word(value);
    validateMax({ label: label2, value: value2, ...rest });
  }
}

export default validateMaxWords;
