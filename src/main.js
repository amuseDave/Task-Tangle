import "./styles/style.css";
import "./styles/canvas.css";

import { game } from "./models/Game.js";
import { warrior } from "./models/Characters.js";

import "./models/UserEvents.js";

game.addCharacter(warrior);
requestAnimationFrame(game.animate.bind(game));
