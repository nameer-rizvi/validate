import { type ValidationOptions } from "./interfaces.js";
import * as utils from "@nameer/utils";

function validateMin({ label, setting, value }: ValidationOptions): void {
  if (utils.isNumber(value) && utils.isNumber(setting)) {
    if (value < setting) {
      const parts = label.split(utils.delimiter);
      const end = parts[1] ? ` ${parts[1]}.` : ".";
      throw new Error(`${parts[0]} must be at least ${setting}${end}`);
    }
  }
}

export default validateMin;
