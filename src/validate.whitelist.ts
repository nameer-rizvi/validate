import { type ValidationOptions } from "./interfaces.js";
import * as utilN from "@nameer/utils";

function validateWhitelist({ label, setting, value }: ValidationOptions): void {
  const values = normalize(value);
  const settings = normalize(setting);
  for (const v of values) {
    if (!settings.includes(v)) {
      throw new Error(`${label}: "${v}" is not an acceptable value.`);
    }
  }
}

function normalize(input: unknown): string[] {
  if (utilN.isString(input)) {
    return [input.toLowerCase()];
  }
  if (utilN.isArray(input)) {
    const list: string[] = [];
    for (const item of input.flat())
      if (utilN.isString(item)) list.push(item.toLowerCase());
    return list;
  }
  if (utilN.isObject(input)) {
    const list: string[] = [];
    for (const value of Object.values(input).flat())
      if (utilN.isString(value)) list.push(value.toLowerCase());
    return list;
  }
  return [];
}

export default validateWhitelist;
