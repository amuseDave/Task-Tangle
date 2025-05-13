import "./styles/style.css";
import { setCanvasSizeForScreen } from "./utils.js";
import { game } from "./models/Game.js";
import "./models/Characters/Characters.js";
import "./models/Objetcs/Objects.js";

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
