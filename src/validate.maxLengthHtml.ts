import { type ValidationOptions } from "./interfaces.js";
import validateMaxLength from "./validate.maxLength.js";
import * as utils from "@nameer/utils";
import * as stringStripHtml from "string-strip-html";

function validateMaxLengthHtml({ value, ...rest }: ValidationOptions): void {
  if (utils.isString(value)) {
    const value2 = stringStripHtml.stripHtml(value).result;
    validateMaxLength({ value: value2, ...rest });
  }
}

export default validateMaxLengthHtml;
