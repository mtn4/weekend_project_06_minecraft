import { draw, gameBoard, generateRandomMatrix } from "./board.js";
import {} from "./inventory.js";
import {} from "./reset.js";
import {} from "./tools.js";
import {} from "./theme.js";

const landingPage = document.querySelector(".landing-page");
const landingBtn = document.querySelector(".landing-page__btn");
const container = document.getElementById("game-container");

export let gameObj = {
  activeTool: "",
  toolName: "",
  activeInventory: false,
  typeInventory: "",
  theme: "game-board--light",
  matrix: [],
};

landingBtn.addEventListener("click", () => {
  landingPage.classList.toggle("display-none");
  container.classList.toggle("display-none");
  gameObj.matrix = generateRandomMatrix();
  draw(gameObj.matrix);
});
