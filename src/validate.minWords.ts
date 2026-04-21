import { type ValidationOptions } from "./interfaces.js";
import validateMin from "./validate.min.js";
import * as utils from "@nameer/utils";

function validateMinWords({ label, value, ...rest }: ValidationOptions): void {
  if (utils.isString(value)) {
    const label2 = `${label}${utils.delimiter}words`;
    const value2 = utils.stringLength.word(value);
    validateMin({ label: label2, value: value2, ...rest });
  }
}

export default validateMinWords;
