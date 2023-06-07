// import { assertEquals } from "../utils/assert.js";
import { readTextFile, splitLines } from "../utils/files.js";
import util from "node:util";
util.inspect.defaultOptions.maxArrayLength = null;

const inputText = readTextFile("days/day02_input.txt");
const splitInputText = splitLines(inputText).filter((item) => item); // filter out empty items
const games = splitInputText.map((item) => item.split(" ")); // [["A", "Y"], ["B", "X"], ["C", "Z"], ...]

type Game = string[];

const gameShapeIndex = 0;
const gameOutcomeIndex = 1;

// Map shapes to scores
const shapeKeyScoreConfig: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
};

// Map game outcomes to scores
const outcomeScoreConfig: Record<string, number> = {
  lose: 0,
  draw: 3,
  win: 6,
};

const keyOutcomeConfig: Record<string, string> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const gameRulesConfig = [
  ["A", "C"], // rock beats scissors, etc...
  ["B", "A"],
  ["C", "B"],
];

// given a desired outcome, select the index in each gameRuleConfig to search
// example: if we want to lose we should search for the opponents shape in the 0 index position of wach game rule
const rulesConfigIndexToSearchForDesiredOutcome: Record<string, number> = {
  lose: 0,
  win: 1,
};

// given a desired outcome, select the array index we want to return as the desired shapeKey
// example: if we want to win we should return the ruleConfig shapeKey at index 0
const indexOfRuleKeyForDesiredOutcome: Record<string, number> = {
  lose: 1,
  win: 0,
};

function keyForDrawOutcome(game: Game) {
  return game[0];
}

function desiredOutcomeKeyForGame(game: Game) {
  return game[gameOutcomeIndex];
}

function desiredOutcomeForGame(game: Game) {
  const outcomeKey = desiredOutcomeKeyForGame(game);
  return keyOutcomeConfig[outcomeKey];
}

function desiredGameRuleForDesiredOutcome(game: Game) {
  const desiredOutcome = desiredOutcomeForGame(game);
  if (desiredOutcome === "draw") return;
  const rulesIndexToSearch =
    rulesConfigIndexToSearchForDesiredOutcome[desiredOutcome];
  const desiredOutcomeGameRule = gameRulesConfig.find(
    (rule) => rule[rulesIndexToSearch] === game[gameShapeIndex]
  );
  return desiredOutcomeGameRule;
}

function desiredShapeKeyForDesiredOutcome(game: Game) {
  const desiredOutcome = desiredOutcomeForGame(game);
  if (desiredOutcome === "draw") return keyForDrawOutcome(game);
  const desiredOutcomeGameRule = desiredGameRuleForDesiredOutcome(game);
  if (!desiredOutcomeGameRule) return;
  const indexOfRuleKey = indexOfRuleKeyForDesiredOutcome[desiredOutcome];
  const desiredShapeKey = desiredOutcomeGameRule[indexOfRuleKey];
  return desiredShapeKey;
}

function outcomeScore(outcome: string) {
  return outcomeScoreConfig[outcome];
}

function shapeKeyScore(shapeKey: string) {
  return shapeKeyScoreConfig[shapeKey];
}

function scoreForGame(game: Game) {
  const desiredOutcome = desiredOutcomeForGame(game);
  const desiredShapeKey = desiredShapeKeyForDesiredOutcome(game);
  if (!desiredOutcome || !desiredShapeKey) return 0;
  return outcomeScore(desiredOutcome) + shapeKeyScore(desiredShapeKey);
}

const totalScores = games.reduce((acc, game) => {
  const gameScore = scoreForGame(game);
  return acc + gameScore;
}, 0);

console.log(totalScores);

// const testGames = [
//   ["A", "Y"], // draw => 4
//   ["B", "X"], // lose => 1
//   ["C", "Z"], // win => 7
// ];

// function gameOutcomeLog(game: Game) {
//   return {
//     game,
//     desiredOutcomeKey: desiredOutcomeKeyForGame(game),
//     desiredOutcome: desiredOutcomeForGame(game),
//     desiredGameRuleForDesiredOutcome: desiredGameRuleForDesiredOutcome(game),
//     desiredShapeKeyForDesiredOutcome: desiredShapeKeyForDesiredOutcome(game),
//     scoreForGame: scoreForGame(game),
//   };
// }

// testGames.forEach((game) => {
//   console.log(gameOutcomeLog(game));
// });
