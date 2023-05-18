import { assertEquals } from "../utils/assert.js";
import { readTextFile, splitLines } from "../utils/files.js";
import util from "node:util";
util.inspect.defaultOptions.maxArrayLength = null;

const inputText = readTextFile("days/day01_input.txt");
const splitInputText = splitLines(inputText);

let calorieCounts = [];
let count = 0;

splitInputText.forEach((item) => {
  if (item === "") {
    calorieCounts.push(count);
    count = 0;
  } else {
    count += parseInt(item);
  }
});

const sortedCalorieCounts = calorieCounts.sort((a, b) => a - b);

const resultPartOne = sortedCalorieCounts[sortedCalorieCounts.length - 1];

const resultPartTwo =
  sortedCalorieCounts[sortedCalorieCounts.length - 1] +
  sortedCalorieCounts[sortedCalorieCounts.length - 2] +
  sortedCalorieCounts[sortedCalorieCounts.length - 3];

console.log("RESULT PART ONE: ", resultPartOne);
console.log("RESULT PART TWO: ", resultPartTwo);
