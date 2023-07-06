import { readTextFile, splitLines } from "../utils/files.js";
import util from "node:util";
util.inspect.defaultOptions.maxArrayLength = null;

const inputText = readTextFile("days/day04_input.txt");
const splitInputText = splitLines(inputText);

const testInput = [
  "2-4,6-8",
  "2-3,4-5",
  "5-7,7-9",
  "2-8,3-7",
  "6-6,4-6",
  "2-6,4-8",
];

// "2-4,6-8"  => ["2-4", "6-8"]
const splitAtComma = (input: string): string[] => input.split(",");

// "2-4" => ["2", "4"]
const splitAtDash = (input: string): string[] => input.split("-");

// ["2", "4"] => [2, 4]
const stringArrayToNumberArray = (input: string[]): number[] =>
  input.map((item) => Number(item));

// count lines of input that are fully contained in another line
const fullyContainedCount = (input: string[]) =>
  input.reduce((acc, line) => {
    const lineToArray = splitAtComma(line);
    if (lineToArray.length > 2) {
      throw new Error("isContained error: cant compare more than two items");
    }

    const sideA = stringArrayToNumberArray(splitAtDash(lineToArray[0]));
    const sideB = stringArrayToNumberArray(splitAtDash(lineToArray[1]));

    // check if sideA is contained in sideB or vice versa
    const isContained = Boolean(
      (sideA[0] >= sideB[0] && sideA[1] <= sideB[1]) ||
        (sideB[0] >= sideA[0] && sideB[1] <= sideA[1])
    );

    if (isContained) {
      return acc + 1;
    }
    return acc;
  }, 0);

const testResult = fullyContainedCount(testInput);
const result = fullyContainedCount(splitInputText);

console.log("OUTPUT ===> ", testResult); // => 2
console.log("OUTPUT ===> ", result); // => 444
