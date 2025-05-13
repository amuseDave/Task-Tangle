import { PlayerController } from "../controllers/PlayerController.js";
import { AIController } from "../controllers/AIController.js";
import { setCanvasSizeForScreen } from "../utils.js";
import { Camera } from "./Camera.js";

class Game {
  constructor() {
    this.canvasEl = document.getElementById("canvas");
    this.ctx = this.canvasEl.getContext("2d");

    this.worldWidth = 4000;
    this.worldHeight = 1000;
    this.camera = new Camera(this.canvasEl);

    this.characters = [];
    this.objects = [];

    this.currentTime = 0;

    this.player;

    setCanvasSizeForScreen(this.canvasEl);
  }

  addCharacter({ character, x, y, type }) {
    character.posX = x;
    character.posY = y;
    this.characters.push(character);

    if (type === "enemy") {
      new AIController();
    } else if (type === "player") {
      this.setPlayer(character);
      this.camera.setTarget(character);
    }
  }

  setPlayer(player) {
    // if (this.playerController) this.playerController.removeEvents();
    this.player = player;
    this.playerController = new PlayerController(player);
    this.playerController.setEvents();
  }

  setAI(character) {}

  animate(timeframe) {
    this.currentTime = timeframe;
    const { width, height } = this.canvasEl;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    this.camera.centerOn();

    for (let i = this.characters.length - 1; i >= 0; i--) {
      const char = this.characters[i];

      if (char.loadedImages) {
        char.setState();
        char.setFrames();
        char.setAnimation();
      }
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

export const game = new Game();
