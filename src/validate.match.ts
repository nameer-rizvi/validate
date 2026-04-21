import { type ValidationOptions } from "./interfaces.js";

function validateMatch({
  label,
  value,
  match,
  matchLabel,
}: ValidationOptions): void {
  if (match !== undefined && match !== value) {
    throw new Error(`${label} must match "${matchLabel?.toLowerCase()}".`);
  }
}

export default validateMatch;
