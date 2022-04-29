import { gameObj } from "./play.js";
import { draw, gameBoard } from "./board.js";
import { inventory, toolsBtn } from "./inventory.js";
import { resetGameBtn } from "./reset.js";

export const themesBtn = document.querySelectorAll(".tool-bar-btn")[4];
const worldsContainer = document.querySelector("#themes-container");
const light = document.querySelector('[data-theme="light"]');
const dark = document.querySelector('[data-theme="dark"]');

export const themesObjArr = [
  {
    themeClass: "game-board--light",
    themeName: light,
  },
  {
    themeClass: "game-board--dark",
    themeName: dark,
  },
];

function showThemeButtons() {
  worldsContainer.classList.toggle("display-none");
  themesBtn.classList.toggle("display-none");
  resetGameBtn.classList.toggle("display-none");
}

themesBtn.addEventListener("click", (e) => {
  inventory.classList.toggle("display-none");
  toolsBtn.classList.toggle("display-none");
  showThemeButtons();
});

(function themesEventListeners() {
  themesObjArr.forEach((theme) => {
    theme.themeName.addEventListener("click", (e) => {
      gameObj.theme = theme.themeClass;
      changeTheme();
    });
  });
})();

function changeTheme() {
  gameBoard.innerHTML = "";
  draw(gameObj.matrix);
  inventory.classList.toggle("display-none");
  toolsBtn.classList.toggle("display-none");
  showThemeButtons();
}
