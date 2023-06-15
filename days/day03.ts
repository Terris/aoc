// import { assertEquals } from "../utils/assert.js";

import { readTextFile, splitLines } from "../utils/files.js";
import util from "node:util";
util.inspect.defaultOptions.maxArrayLength = null;

const inputText = readTextFile("days/day03_input.txt");
const splitInputText = splitLines(inputText);

const letterScores = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const stringToLetterArray = (str: string) => str.split("");
const splitStringInHalf = (str: string) => [
  str.slice(0, str.length / 2),
  str.slice(str.length / 2),
];

const matchLetterInTwoArrays = (str: string) => {
  const splitString = splitStringInHalf(str);
  const lettersArrays = splitString.map(stringToLetterArray);
  for (let letter of lettersArrays[0]) {
    if (lettersArrays[1].includes(letter)) {
      return letter;
    }
  }
};

const matches = splitInputText.map(matchLetterInTwoArrays);
const matchesScore = matches.reduce((acc, match) => {
  const score = letterScores.indexOf(match!) + 1;
  return acc + score;
}, 0);

console.log(matchesScore);
