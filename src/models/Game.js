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
  addObject(object) {
    this.objects.push(object);
  }

  setPlayer(player) {
    // if (this.playerController) this.playerController.removeEvents();
    this.player = player;
    this.playerController = new PlayerController(player);
    this.playerController.setEvents();
  }

  animate(timeframe) {
    this.currentTime = timeframe;
    const { width, height } = this.canvasEl;

    this.ctx.clearRect(0, 0, width, height);
    this.camera.centerOn();

    this.animateCharacters();
    this.animateObjects();

    requestAnimationFrame(this.animate.bind(this));
  }
  animateObjects() {
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const object = this.objects[i];
      if (object.loadedImage) {
        object.draw();
      }
    }
  }

  animateCharacters() {
    for (let i = this.characters.length - 1; i >= 0; i--) {
      const char = this.characters[i];
      if (char.loadedImages) {
        char.setState();
        char.setFrames();
        char.setAnimation();
      }
    }
  }
}

export const game = new Game();
