import { type ValidationOptions } from "./interfaces.js";
import * as utilN from "@nameer/utils";

function validateBlacklist({ label, setting, value }: ValidationOptions): void {
  const values = normalize(value);
  const settings = normalize(setting);
  for (const v of values) {
    for (const s of settings) {
      if (v.includes(s)) {
        throw new Error(`${label}: "${s}" is a reserved term.`);
      }
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

export default validateBlacklist;
