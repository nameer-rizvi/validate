import { type ValidationOptions } from "./interfaces.js";
import * as utils from "@nameer/utils";

function validateMax({ label, setting, value }: ValidationOptions): void {
  if (utils.isNumber(value) && utils.isNumber(setting)) {
    if (value > setting) {
      const parts = label.split(utils.delimiter);
      const end = parts[1] ? ` ${parts[1]}.` : ".";
      const error = `${parts[0]} must be less than or equal to ${setting}${end}`;
      throw new Error(error);
    }
  }
}

export default validateMax;
