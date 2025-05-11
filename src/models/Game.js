import { setCanvasSizeForScreen } from "./Sizes";

class Game {
  constructor() {
    this.canvasEl = document.getElementById("canvas");
    this.ctx = this.canvasEl.getContext("2d");
    this.characters = [];

    this.currentTime = 0;

    setCanvasSizeForScreen(this.canvasEl);
  }

  addCharacter(character) {
    this.characters.push(character);
  }

  animate(timeframe) {
    const { width, height } = this.canvasEl;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    for (const char of this.characters) {
      if (char.loadedImages) {
        char.setState();
        char.setAnimation({ ctx });

        if (char.currentTime + char.spriteState.frameInterval < timeframe) {
          char.setSpriteCount();
          char.currentTime = timeframe;
        }
      }
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

export const game = new Game();
