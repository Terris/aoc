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

const matchLetterInArrayOfStrings = (arr: string[]) => {
  for (let letter of arr[0]) {
    if (arr.every((str) => str.includes(letter))) {
      return letter;
    }
  }
};

const matches: (string | undefined)[] = splitInputText.map((str) => {
  const splitString = splitStringInHalf(str);
  return matchLetterInArrayOfStrings(splitString);
});

const scoreReducer = (arr: (string | undefined)[]): number =>
  arr.reduce((acc, item) => {
    const score = letterScores.indexOf(item!) + 1;
    return acc + score;
  }, 0);

const matchesScore: number = scoreReducer(matches);

const partOneAnswer: number = matchesScore;

const groupArrayItemsByN = (arr: string[], n: number) => {
  const groups = [];
  for (let i = 0; i < arr.length; i += n) {
    groups.push(arr.slice(i, i + n));
  }
  return groups;
};

// PART TWO
const splitInputTextByThree: string[][] = groupArrayItemsByN(splitInputText, 3);
const inputTextBadges = splitInputTextByThree.map(matchLetterInArrayOfStrings);
const partTwoAnswer = scoreReducer(inputTextBadges);
