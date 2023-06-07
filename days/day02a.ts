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

// Map game keys to shapes
const KeyShape: Record<string, string> = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

// Map shapes to scores
const shapeScoreConfig: Record<string, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

// Map game outcomes to scores
const outcomeScoreConfig: Record<string, number> = {
  lose: 0,
  draw: 3,
  win: 6,
};

// Map keys to outcomes
const winningKeyConfigWinningIndex = 0;
const winningKeyConfig = [
  ["A", "Z"], // Rock beats scissors, etc...
  ["B", "X"],
  ["C", "Y"],
  ["X", "C"],
  ["Y", "A"],
  ["Z", "B"],
];

function playerShapeByKey(key: string) {
  return KeyShape[key];
}

function gameIsDraw(game: Game) {
  // true if the shapes are the same
  return Boolean(
    playerShapeByKey(game[playerOneGameIndex]) ===
      playerShapeByKey(game[playerTwoGameIndex])
  );
}

function winningKeyConfigForGame(game: Game) {
  if (gameIsDraw(game)) return null;
  return winningKeyConfig.find(
    (configItem) =>
      (configItem[0] === game[0] && configItem[1] === game[1]) ||
      (configItem[0] === game[1] && configItem[1] === game[0])
  );
}

// The key that won the game
function winningKeyForGame(game: Game) {
  if (gameIsDraw(game)) return null;
  const winningKeyConfig = winningKeyConfigForGame(game);
  if (!winningKeyConfig) return null;
  return winningKeyConfig[winningKeyConfigWinningIndex];
}

// The index of the winning key in the game array
function winningGameIndex(game: Game) {
  if (gameIsDraw(game)) return;
  const winningKey = winningKeyForGame(game);
  if (!winningKey) return;
  return game.indexOf(winningKey);
}

function outcomeForPlayerAtIndex(game: Game, index: number) {
  if (gameIsDraw(game)) return "draw";
  const winningIndex = winningGameIndex(game);
  if (winningIndex === index) return "win";
  return "lose";
}

function outcomeScore(outcome: string) {
  return outcomeScoreConfig[outcome];
}

function shapeScore(shape: string) {
  return shapeScoreConfig[shape];
}

function scoreGameForPlayerAtIndex(game: Game, index: number) {
  const outcomeForPlayer = outcomeForPlayerAtIndex(game, index);
  const shapeForPlayer = KeyShape[game[index]];
  return outcomeScore(outcomeForPlayer) + shapeScore(shapeForPlayer);
}

const playerTwoTotalScore = games.reduce((acc, game) => {
  const scoreForPlayerTwo = scoreGameForPlayerAtIndex(game, playerTwoGameIndex);
  return acc + scoreForPlayerTwo;
}, 0);

const result = playerTwoTotalScore;
console.log(result);

// const testGames = [
//   ["A", "Y"],
//   ["B", "X"],
//   ["C", "Z"],
// ];

// function gameOutcomeLog(game: Game) {
//   return {
//     game,
//     winningKey: gameIsDraw(game) ? "DRAW" : winningKeyForGame(game),
//     winningGameIndex: gameIsDraw(game) ? "DRAW" : winningGameIndex(game),
//     winningPlayer: gameIsDraw(game) ? "DRAW" : winningGamePlayer(game),
//     playerOneScore: scoreGameForPlayerAtIndex(game, 0),
//     playerTwoScore: scoreGameForPlayerAtIndex(game, 1),
//   };
// }

// testGames.forEach((game) => {
//   console.log(gameOutcomeLog(game));
// });
