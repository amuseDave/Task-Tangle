import "./style.css";
import "./canvas.css";

import { Game } from "./models/Game.js";
import { warrior } from "./models/Characters.js";

import "./models/UserEvents.js";

const game = new Game();
game.addCharacter(warrior);

requestAnimationFrame(game.animate.bind(game));
