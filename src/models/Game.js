import { PlayerController } from "../controllers/PlayerController.js";
import { AIController } from "../controllers/AIController.js";
import { setCanvasSizeForScreen } from "../utils.js";
import { Camera } from "./Camera.js";

class Game {
  constructor() {
    this.canvasEl = document.getElementById("canvas");
    this.ctx = this.canvasEl.getContext("2d");

    this.worldWidth = 2200;
    this.worldHeight = 2000;
    this.camera = new Camera(this.canvasEl);

    this.characters = [];
    this.objects = [];
    this.interactiveObjects = [];

    this.currentTime = 0;
    this.player;

    setCanvasSizeForScreen(this.canvasEl);
  }

  animate(timeframe) {
    if (!game.isMenuOpen) {
      this.currentTime = timeframe;

      const { width, height } = this.canvasEl;
      this.ctx.clearRect(0, 0, width, height);

      this.camera.centerOn();

      this.animateObjects();
      this.animateCharacters();
    }

    requestAnimationFrame(this.animate.bind(this));
  }
  animateObjects() {
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const object = this.objects[i];
      object.draw();
    }
  }

  animateCharacters() {
    for (let i = this.characters.length - 1; i >= 0; i--) {
      const char = this.characters[i];
      char.setState();
      char.setFrames();
      char.setAnimation();
    }
  }

  ////// Manipulate game
  addObject(object) {
    this.objects.push(object);
    if (object.isInteractive) this.interactiveObjects.push(object);
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
    if (!this.playerController) {
      this.playerController = new PlayerController(player);
      this.playerController.setEvents();
    }
    this.player = player;
  }
}

export const game = new Game();
