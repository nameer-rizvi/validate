import { type ValidationOptions } from "./interfaces.js";
import validateMinLength from "./validate.minLength.js";
import * as utils from "@nameer/utils";
import * as stringStripHtml from "string-strip-html";

function validateMinLengthHtml({ value, ...rest }: ValidationOptions): void {
  if (utils.isString(value)) {
    const value2 = stringStripHtml.stripHtml(value).result;
    validateMinLength({ value: value2, ...rest });
  }
}

export default validateMinLengthHtml;
