// todo
import { ValidationOptions } from "./interfaces";
import validateMin from "./validate.min";
import * as utils from "@nameer/utils";

function validateMinValueObject({ label, value, ...rest }: ValidationOptions) {
  if (utils.isObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      validateMin({ label: `${label}: "${k}"`, value: v, ...rest });
    }
  }
}

export default validateMinValueObject;
