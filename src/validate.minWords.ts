// todo
import { ValidationOptions } from "./interfaces";
import validateMin from "./validate.min";
import * as utils from "@nameer/utils";

function validateMinWords({ label, value, ...rest }: ValidationOptions) {
  if (utils.isString(value)) {
    const label2 = `${label}${utils.delimiter}words`;
    const value2 = utils.stringLength.word(value);
    validateMin({ label: label2, value: value2, ...rest });
  }
}

export default validateMinWords;
