import { gameObj } from "./play.js";
import { checkMatchingTool } from "./tools.js";
import { addToInventory } from "./inventory.js";

export const gameBoard = document.querySelector("#game-board");
export const gameClassesArr = [
  "game-board--stone",
  "game-board--dirt",
  "game-board--grass",
  "game-board--wood",
  "game-board--leaves",
  "game-board--cloud",
];

export function draw(matrix) {
  gameBoard.classList = "";
  gameBoard.classList.add(`${gameObj.theme}`);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const gameElement = document.createElement("div");
      if (gameClassesArr[matrix[i][j]] !== undefined) {
        gameElement.classList.add(gameClassesArr[matrix[i][j]]);
      }
      gameElement.dataset.x = i;
      gameElement.dataset.y = j;
      gameBoard.appendChild(gameElement);
    }
  }
}
export function generateRandomMatrix() {
  let total = 20;
  let matrix = Array(20)
    .fill(null)
    .map(() => Array(20).fill("-1"));
  let stones = generateRandom(1, 4);
  for (let i = 19; i > 19 - stones; i--) {
    matrix[i].fill(0);
  }
  total -= stones;
  let dirt = generateRandom(1, 5);
  for (let i = 19 - stones; i > 19 - stones - dirt - 1; i--) {
    matrix[i].fill(1);
  }
  matrix[19 - stones - dirt].fill(2);
  total -= dirt + 1;
  let treesAmount = generateRandom(1, 4);
  let lastTreePosition = 0;
  for (let i = 0; i < treesAmount; i++) {
    let treePosition = generateRandom(
      lastTreePosition === 0 ? 1 : lastTreePosition + 3,
      19 - 3 * (treesAmount - 1 - i)
    );
    let treeHeight = generateRandom(4, 8);
    let treeWood = generateRandom(1, 4);
    let treeLeaves = treeHeight - treeWood;
    for (let j = 0; j < treeHeight; j++) {
      if (j < treeWood) {
        matrix[total - 1 - j][treePosition] = 3;
      } else {
        matrix[total - 1 - j][treePosition] = 4;
        matrix[total - 1 - j][treePosition - 1] = 4;
        matrix[total - 1 - j][treePosition + 1] = 4;
      }
    }
    lastTreePosition = treePosition;
  }
  let firstCloudRow = generateRandom(1, 4);
  let firstCloudColumn = generateRandom(1, 9);
  let SecondCloudRow = generateRandom(1, 4);
  let SecondCloudColumn = generateRandom(11, 19);
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
        matrix[firstCloudRow][firstCloudColumn] = 5;
        matrix[SecondCloudRow][SecondCloudColumn] = 5;
      } else {
        let rand1 = generateRandom(1, 3);
        let rand2 = generateRandom(1, 3);
        if (rand1 === 2) {
          matrix[firstCloudRow + i][firstCloudColumn + j] = 5;
        }
        if (rand2 === 2) {
          matrix[SecondCloudRow + i][SecondCloudColumn + j] = 5;
        }
      }
    }
  }

  return matrix;
}

function generateRandom(min, max) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}

gameBoard.addEventListener("click", (e) => {
  if (gameObj.activeInventory === false) {
    if (checkMatchingTool(e.target.classList)) {
      addToInventory(e.target.classList[0]);
      gameObj.matrix[e.target.dataset.x][e.target.dataset.y] = -1;
      e.target.classList = "";
      if (gameObj.activeTool.classList.contains("btn--flash-red")) {
        gameObj.activeTool.classList.remove("btn--flash-red");
      }
    } else {
      gameObj.activeTool.classList.add("btn--flash-red");
    }
  } else {
    if (e.target.classList.length === 0) {
      gameObj.matrix[e.target.dataset.x][e.target.dataset.y] =
        gameClassesArr.findIndex(
          (element) => element === `${gameObj.typeInventory}`
        );
      e.target.classList = `${gameObj.typeInventory}`;
      gameObj.activeInventory = false;
      gameObj.typeInventory = "";
      inventory.classList.remove("btn--flash-red", "btn--flash-blue");
      inventory.innerHTML = "Inventory";
    } else {
      inventory.classList.add("btn--flash-red");
    }
  }
});
