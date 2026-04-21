import { type ValidationOptions } from "./interfaces.js";
import validateMinWords from "./validate.minWords.js";
import * as utils from "@nameer/utils";
import * as stringStripHtml from "string-strip-html";

function validateMinWordsHtml({ value, ...rest }: ValidationOptions): void {
  if (utils.isString(value)) {
    const value2 = stringStripHtml.stripHtml(value).result;
    validateMinWords({ value: value2, ...rest });
  }
}

export default validateMinWordsHtml;
