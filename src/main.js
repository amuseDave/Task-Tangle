import "./styles/style.css";

import { game } from "./models/Game.js";
import { warrior, skeletonArcher } from "./models/Characters/Characters.js";

import { setCanvasSizeForScreen } from "./utils.js";

game.addCharacter({ character: warrior, x: 30, y: 0, type: "player" });

game.addCharacter({ character: skeletonArcher, x: 1000, y: 0, type: "enemy" });

requestAnimationFrame(game.animate.bind(game));

//
///
///
// Responsive + no context right click menu
window.addEventListener("resize", () => setCanvasSizeForScreen(game.canvasEl));
window.addEventListener("contextmenu", (event) => event.preventDefault());
// Responsive + no context right click menu
///
///
//
