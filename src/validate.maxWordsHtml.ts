import { type ValidationOptions } from "./interfaces.js";
import validateMaxWords from "./validate.maxWords.js";
import * as utils from "@nameer/utils";
import * as stringStripHtml from "string-strip-html";

function validateMaxWordsHtml({ value, ...rest }: ValidationOptions): void {
  if (utils.isString(value)) {
    const value2 = stringStripHtml.stripHtml(value).result;
    validateMaxWords({ value: value2, ...rest });
  }
}

export default validateMaxWordsHtml;
