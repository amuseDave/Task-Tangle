import "./styles/style.css";

import { game } from "./models/Game.js";
import { warrior } from "./models/Characters/Characters.js";

import { setCanvasSizeForScreen } from "./utils.js";
import { skeletonArcher } from "./models/Characters/SkeletonArcher";

game.addCharacter(warrior);
game.setPlayer(warrior);
game.camera.setTarget(warrior);

game.addCharacter(skeletonArcher);

requestAnimationFrame(game.animate.bind(game));

window.addEventListener("resize", () => setCanvasSizeForScreen(game.canvasEl));
window.addEventListener("contextmenu", (event) => event.preventDefault());
