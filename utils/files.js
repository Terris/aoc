import { readFileSync } from "fs";
import { EOL } from "os";

/**
 * @param {string} path
 * @returns {string}
 */
export function readTextFile(path) {
  return readFileSync(path, "utf8");
}

/**
 *
 * @param {string} input
 * @returns {string[]}
 */
export function splitLines(input) {
  return input.split(EOL);
}
