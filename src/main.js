import "./styles/style.css";

import { game } from "./models/Game.js";
import { warrior } from "./models/Characters.js";

import "./models/UserEvents.js";
import { setCanvasSizeForScreen } from "./models/Sizes.js";

game.addCharacter(warrior);
requestAnimationFrame(game.animate.bind(game));

window.addEventListener("resize", () => setCanvasSizeForScreen(game.canvasEl));
