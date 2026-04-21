import { type ValidationOptions } from "./interfaces.js";
import validateMin from "./validate.min.js";
import * as utils from "@nameer/utils";

function validateMinLength({ label, value, ...rest }: ValidationOptions): void {
  if (utils.isStringOrArray(value)) {
    const thing = utils.isString(value) ? "characters" : "items";
    const label2 = `${label}${utils.delimiter}${thing}`;
    validateMin({ label: label2, value: value.length, ...rest });
  }
}

export default validateMinLength;
