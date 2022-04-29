import { gameObj } from "./play.js";
import {} from "./board.js";
import { axe, shovel, pickaxe } from "./tools.js";

export const inventory = document.querySelector(`#inventory`);
export const inventoryContainer =
  document.querySelector(`.inventory-container`);
export const toolsBtn = document.querySelector("#tool-bar__tools");

export function addToInventory(target) {
  let elem = document.createElement("img");
  if (target === "game-board--leaves") {
    elem.setAttribute("src", "./assets/leaves.png");
    gameObj.typeInventory = "game-board--leaves";
  } else if (target === "game-board--wood") {
    elem.setAttribute("src", "./assets/wood.jpg");
    gameObj.typeInventory = "game-board--wood";
  } else if (target === "game-board--grass") {
    elem.setAttribute("src", "./assets/mcdirt.jpg");
    gameObj.typeInventory = "game-board--grass";
  } else if (target === "game-board--stone") {
    elem.setAttribute("src", "./assets/cobblestone.jpg");
    gameObj.typeInventory = "game-board--stone";
  } else if (target === "game-board--dirt") {
    elem.setAttribute("src", "./assets/dirt.jpg");
    gameObj.typeInventory = "game-board--dirt";
  }
  inventory.replaceChildren(elem);
}

inventory.addEventListener("click", (e) => {
  gameObj.activeTool = "";
  gameObj.toolName = "";
  axe.classList.remove("btn--flash-red", "btn--flash-blue");
  shovel.classList.remove("btn--flash-red", "btn--flash-blue");
  pickaxe.classList.remove("btn--flash-red", "btn--flash-blue");
  if (gameObj.typeInventory === "") {
    inventory.classList.add("btn--flash-red");
  } else {
    gameObj.activeInventory = true;
    inventory.classList.remove("btn--flash-red");
    inventory.classList.toggle("btn--flash-blue");
  }
});
