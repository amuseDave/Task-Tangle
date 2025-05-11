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
        target.characterPosX - game.canvasEl.width / 2, // 3400 - 450 =
        game.worldWidth - game.canvasEl.width // 4000 - 900 = 3100
      )
    );
    this.y = Math.max(
      0,
      Math.min(
        target.characterPosY - game.canvasEl.height / 2,
        game.worldHeight - game.canvasEl.height
      )
    );
  }

  setTarget(target) {
    this.target = target;
  }
}
