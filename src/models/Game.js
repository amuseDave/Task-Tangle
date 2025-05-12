import { PlayerController } from "../controllers/PlayerController.js";
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

    this.currentTime = 0;

    setCanvasSizeForScreen(this.canvasEl);
  }

  addCharacter(character) {
    this.characters.push(character);
  }

  setPlayer(player) {
    if (this.playerController) this.playerController.removeEvents();
    this.playerController = new PlayerController(player);
    this.playerController.setEvents();
  }

  animate(timeframe) {
    const { width, height } = this.canvasEl;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    this.camera.centerOn();

    for (let i = this.characters.length - 1; i >= 0; i--) {
      const char = this.characters[i];
      if (char.loadedImages) {
        char.setState();
        char.setAnimation();

        if (char.currentTime + char.spriteState.frameInterval < timeframe) {
          char.setSprite();
          char.currentTime = timeframe;
        }
      }
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

export const game = new Game();
