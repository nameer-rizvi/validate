import { type ValidationOptions } from "./interfaces.js";
import * as utilN from "@nameer/utils";

function validateMin({ label, setting, value }: ValidationOptions): void {
  if (utilN.isNumber(value) && utilN.isNumber(setting)) {
    if (value < setting) {
      const parts = label.split(utilN.delimiter);
      const end = parts[1] ? ` ${parts[1]}.` : ".";
      throw new Error(`${parts[0]} must be at least ${setting}${end}`);
    }
  }
}

export default validateMin;
