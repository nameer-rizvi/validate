import { type ValidationOptions } from "./interfaces.js";
import validateMaxLength from "./validate.maxLength.js";
import * as utilN from "@nameer/utils";
import * as stringStripHtml from "string-strip-html";

function validateMaxLengthHtml({ value, ...rest }: ValidationOptions): void {
  if (utilN.isString(value)) {
    const value2 = stringStripHtml.stripHtml(value).result;
    validateMaxLength({ value: value2, ...rest });
  }
}

export default validateMaxLengthHtml;
