// import { assertEquals } from "../utils/assert.js";
import { readTextFile, splitLines } from "../utils/files.js";
import util from "node:util";
util.inspect.defaultOptions.maxArrayLength = null;

const inputText = readTextFile("days/day02_input.txt");
const splitInputText = splitLines(inputText).filter((item) => item); // filter out empty items
const games = splitInputText.map((item) => item.split(" ")); // [["A", "Y"], ["B", "X"], ["C", "Z"], ...]

type Game = string[];

const playerOneGameIndex = 0;
const playerTwoGameIndex = 1;
const players = ["Player One", "Player Two"];
const gameShapeIndex = 0;
const gameOutcomeIndex = 1;

// Map game keys to shapes
const KeyShape: { [key: string]: string } = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

// Map shapes to scores
const shapeKeyScoreConfig = {
  A: 1,
  B: 2,
  C: 3,
};

// Map game outcomes to scores
const outcomeScoreConfig = {
  lose: 0,
  draw: 3,
  win: 6,
};

const keyOutcomeConfig = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const gameRulesConfig = [
  ["A", "C"], // rock beats scissors, etc...
  ["B", "A"],
  ["C", "B"],
];

const rulesConfigIndexToSearchForDesiredOutcome = {
  lose: 0,
  win: 1,
};

const indexOfRuleKeyForDesiredOutcome = {
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
  return keyOutcomeConfig[outcomeKey as keyof typeof keyOutcomeConfig];
}

function desiredGameRuleForDesiredOutcome(game: Game) {
  const desiredOutcome = desiredOutcomeForGame(game);
  const rulesIndexToSearch =
    rulesConfigIndexToSearchForDesiredOutcome[
      desiredOutcome as keyof typeof rulesConfigIndexToSearchForDesiredOutcome
    ];
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
  return desiredOutcomeGameRule[
    indexOfRuleKeyForDesiredOutcome[
      desiredOutcome as keyof typeof indexOfRuleKeyForDesiredOutcome
    ]
  ];
}

function outcomeScore(outcome: keyof typeof outcomeScoreConfig) {
  return outcomeScoreConfig[outcome];
}

function shapeKeyScore(shapeKey: keyof typeof shapeKeyScoreConfig) {
  return shapeKeyScoreConfig[shapeKey];
}

function scoreForGame(game: Game) {
  const desiredOutcome = desiredOutcomeForGame(
    game
  ) as keyof typeof outcomeScoreConfig;

  const desiredShapeKey = desiredShapeKeyForDesiredOutcome(
    game
  ) as keyof typeof shapeKeyScoreConfig;

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
