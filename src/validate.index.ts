import blacklist from "./validate.blacklist.js";
import blacklistKeys from "./validate.blacklistKeys.js";
import match from "./validate.match.js";
import max from "./validate.max.js";
import maxLength from "./validate.maxLength.js";
import maxLengthHtml from "./validate.maxLengthHtml.js";
import maxLengthValueArray from "./validate.maxLengthValueArray.js";
import maxLengthValueObject from "./validate.maxLengthValueObject.js";
import maxValueArray from "./validate.maxValueArray.js";
import maxValueObject from "./validate.maxValueObject.js";
import maxWords from "./validate.maxWords.js";
import maxWordsHtml from "./validate.maxWordsHtml.js";
import min from "./validate.min.js";
import minLength from "./validate.minLength.js";
import minLengthHtml from "./validate.minLengthHtml.js";
import minLengthValueArray from "./validate.minLengthValueArray.js";
import minLengthValueObject from "./validate.minLengthValueObject.js";
import minValueArray from "./validate.minValueArray.js";
import minValueObject from "./validate.minValueObject.js";
import minWords from "./validate.minWords.js";
import minWordsHtml from "./validate.minWordsHtml.js";
import regex from "./validate.regex.js";
import typeValidation from "./validate.type.js";
import typeValueArray from "./validate.typeValueArray.js";
import typeValueObject from "./validate.typeValueObject.js";
import whitelist from "./validate.whitelist.js";
import whitelistKeys from "./validate.whitelistKeys.js";

export default {
  blacklist,
  blacklistKeys,
  match,
  max,
  maxLength,
  maxLengthArray: maxLength,
  maxLengthString: maxLength,
  maxLengthHtml,
  maxLengthValueArray,
  maxLengthValueObject,
  maxValueArray,
  maxValueObject,
  maxWords,
  maxWordsHtml,
  min,
  minLength,
  minLengthArray: minLength,
  minLengthString: minLength,
  minLengthHtml,
  minLengthValueArray,
  minLengthValueObject,
  minValueArray,
  minValueObject,
  minWords,
  minWordsHtml,
  regex,
  type: typeValidation,
  typeValueArray,
  typeValueObject,
  whitelist,
  whitelistKeys,
};
