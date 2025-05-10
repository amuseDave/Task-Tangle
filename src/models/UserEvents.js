import { playerController } from "../controllers/PlayerController";

window.addEventListener("keydown", playerController.handleKeyDown.bind(playerController));
window.addEventListener("keyup", playerController.handleKeyUp.bind(playerController));

window.addEventListener(
  "mousedown",
  playerController.handleMouseDown.bind(playerController)
);
window.addEventListener("mouseup", playerController.handleMouseUp.bind(playerController));
