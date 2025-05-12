import "./styles/style.css";

import { game } from "./models/Game.js";
import { warrior } from "./models/Characters/Characters.js";

import { setCanvasSizeForScreen } from "./utils.js";

game.addCharacter(warrior);
game.setPlayer(warrior);
game.camera.setTarget(warrior);
requestAnimationFrame(game.animate.bind(game));

window.addEventListener("resize", () => setCanvasSizeForScreen(game.canvasEl));
window.addEventListener("contextmenu", (event) => event.preventDefault());
