import { game } from "./Game";

export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.target;
  }

  centerOn(target = this.target) {
    this.x = Math.max(
      0,
      Math.min(
        target.posX - game.canvasEl.width / 2,
        game.worldWidth - game.canvasEl.width
      )
    );
    this.y = Math.max(
      0,
      Math.min(
        target.posY - game.canvasEl.height / 2,
        game.worldHeight - game.canvasEl.height
      )
    );
  }

  setTarget(target) {
    this.target = target;
  }
}
