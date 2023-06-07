// import { assertEquals } from "../utils/assert.js";
import { readTextFile, splitLines } from "../utils/files.js";
import util from "node:util";
util.inspect.defaultOptions.maxArrayLength = null;

const inputText = readTextFile("days/day02_input.txt");
const splitInputText = splitLines(inputText).filter((item) => item); // filter out empty items
const games = splitInputText.map((item) => item.split(" ")); // [["A", "Y"], ["B", "X"], ["C", "Z"], ...]

enum Players {
  playerOne = "playerOne",
  playerTwo = "playerTwo",
}

enum Keys {
  A = "A",
  B = "B",
  C = "C",
  X = "X",
  Y = "Y",
  Z = "Z",
}

enum PlayerOneKey {
  A = Keys.A,
  B = Keys.B,
  C = Keys.C,
}

enum PlayerTwoKey {
  X = Keys.X,
  Y = Keys.Y,
  Z = Keys.Z,
}

enum Shape {
  rock = "rock",
  paper = "paper",
  scissors = "scissors",
}

const KeyShape = {
  A: Shape.rock,
  B: Shape.paper,
  C: Shape.scissors,
  X: Shape.rock,
  Y: Shape.paper,
  Z: Shape.scissors,
};

type Key = PlayerOneKey | PlayerTwoKey;
type Game = [PlayerOneKey, PlayerTwoKey];

const shapeScoreConfig = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const outcomeScoreConfig = {
  lose: 0,
  draw: 3,
  win: 1,
};

const winningShapeConfig = [
  {
    game: [Shape.rock, Shape.scissors],
    winningShape: Shape.rock,
  },
  {
    game: [Shape.paper, Shape.rock],
    winningShape: Shape.paper,
  },
  {
    game: [Shape.scissors, Shape.paper],
    winningShape: Shape.scissors,
  },
];

function playerShape(key: Key): Shape {
  return KeyShape[key];
}

function gameIsTie(game: Game) {
  return playerShape(game[0]) === playerShape(game[1]);
}

function getGameWinningShape(
  game: [PlayerOneKey, PlayerTwoKey]
): Shape | undefined {
  if (gameIsTie(game)) return undefined;
  const playerOneShape = playerShape(game[0]);
  const playerTwoShape = playerShape(game[1]);
  const winningShape = winningShapeConfig.find(
    (item) =>
      (item.game[0] === playerOneShape && item.game[1] === playerTwoShape) ||
      (item.game[1] === playerOneShape && item.game[0] === playerTwoShape)
  )?.winningShape;
  return winningShape;
}

function getGameWinningKey(game: Game): Key | undefined {
  if (gameIsTie(game)) return undefined;
  const gameWinningShape = getGameWinningShape(game);
  if (!gameWinningShape) return undefined;
  const gameWinningKeyIndex = Object.values(KeyShape).indexOf(gameWinningShape);
  const gameWinningKey = Object.keys(KeyShape)[gameWinningKeyIndex];
  return gameWinningKey as Key;
}

function getShapeScore(shape: Shape) {
  return shapeScoreConfig[shape];
}

const testGame: [PlayerOneKey, PlayerTwoKey][] = [
  [PlayerOneKey["A"], PlayerTwoKey["Y"]], // rock vs paper => win => 8
  [PlayerOneKey["B"], PlayerTwoKey["X"]], // paper vs rock => loss => 1
  [PlayerOneKey["C"], PlayerTwoKey["Z"]], // scissors vs scissors => draw => 6
];

function getGameWinningPlayer(game: Game) {}

function gameResultsOutput(game: Game) {
  return {
    game,
    gameShapes: [playerShape(game[0]), playerShape(game[1])],
    shapeScores: [
      getShapeScore(playerShape(game[0])),
      getShapeScore(playerShape(game[1])),
    ],
    winningShape: getGameWinningShape(game),
    winningKey: getGameWinningKey(game),
  };
}

testGame.forEach((game) => {
  console.log(gameResultsOutput(game));
});
