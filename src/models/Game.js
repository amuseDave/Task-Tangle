export class Game {
  constructor() {
    this.canvasEl = document.getElementById("canvas");
    this.ctx = this.canvasEl.getContext("2d");
    this.canvasEl.width = 1920;
    this.canvasEl.height = 917;
    this.characters = [];

    this.currentTime = 0;
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
        char.setAnimation({ ctx });

        if (this.currentTime + 120 < timeframe) {
          char.handleSpriteState();
          this.currentTime = timeframe;
        }
      }
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}
