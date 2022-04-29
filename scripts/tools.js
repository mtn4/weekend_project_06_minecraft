import { gameObj } from "./play.js";

export const toolsObject = {
  axe: {
    location: "./assets/axe.png",
    classes: ["game-board--wood", "game-board--leaves"],
  },
  pickaxe: {
    location: "./assets/pickaxe.png",
    classes: ["game-board--stone"],
  },
  shovel: {
    location: "./assets/shovel.png",
    classes: ["game-board--dirt", "game-board--grass"],
  },
};

const buttonToolBar = document.querySelector("#tool-bar__tools");

(function createToolElements() {
  for (const key in toolsObject) {
    const toolBtn = document.createElement("button");
    toolBtn.setAttribute("data-tool", `${key}`);
    toolBtn.classList.add("tool-bar-btn");
    const toolPic = document.createElement("img");
    toolPic.setAttribute("src", `${toolsObject[key].location}`);
    const toolText = document.createElement("p");
    toolText.innerText += `${key}`;
    toolText.innerText =
      toolText.innerText.charAt(0).toUpperCase() + toolText.innerText.slice(1);
    toolBtn.appendChild(toolPic);
    toolBtn.appendChild(toolText);
    buttonToolBar.appendChild(toolBtn);
  }
})();

export const pickaxe = document.querySelector(`button[data-tool="pickaxe"]`);
export const axe = document.querySelector(`button[data-tool="axe"]`);
export const shovel = document.querySelector(`button[data-tool="shovel"]`);

pickaxe.addEventListener("click", (event) => {
  gameObj.activeInventory = false;
  inventory.classList.remove("btn--flash-red", "btn--flash-blue");
  removeToolsBtnBorders(pickaxe, shovel, axe);
  gameObj.activeTool = pickaxe;
  gameObj.toolName = "pickaxe";
});

shovel.addEventListener("click", (event) => {
  gameObj.activeInventory = false;
  inventory.classList.remove("btn--flash-red", "btn--flash-blue");
  removeToolsBtnBorders(shovel, pickaxe, axe);
  gameObj.activeTool = shovel;
  gameObj.toolName = "shovel";
});

axe.addEventListener("click", (event) => {
  gameObj.activeInventory = false;
  inventory.classList.remove("btn--flash-red", "btn--flash-blue");
  removeToolsBtnBorders(axe, shovel, pickaxe);
  gameObj.activeTool = axe;
  gameObj.toolName = "axe";
});

function removeToolsBtnBorders(targetTool, toolA, toolB) {
  removeToolsRedBorder(targetTool, toolA, toolB);
  targetTool.classList.add("btn--flash-blue");
  toolA.classList.remove("btn--flash-blue");
  toolB.classList.remove("btn--flash-blue");
}

function removeToolsRedBorder(targetTool, toolA, toolB) {
  targetTool.classList.remove("btn--flash-red");
  toolA.classList.remove("btn--flash-red");
  toolB.classList.remove("btn--flash-red");
}

export function checkMatchingTool(targetTool) {
  let toolClass = targetTool[0];
  return toolsObject[`${gameObj.toolName}`].classes.includes(`${toolClass}`);
}
