import { gameObj } from "./play.js";
import { draw, gameBoard, generateRandomMatrix } from "./board.js";

export const resetGameBtn = document.querySelectorAll(".tool-bar-btn")[7];

resetGameBtn.addEventListener("click", (e) => {
  gameBoard.innerHTML = "";
  gameObj.matrix = generateRandomMatrix();
  draw(gameObj.matrix);
});
