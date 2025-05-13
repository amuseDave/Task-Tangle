import { game } from "../../../models/Game";

function setMoveState() {
  let speed;

  if (this.state.isRunning) speed = this.stats.runSpeed;
  else if (this.state.isWalking) speed = this.stats.walkSpeed;

  if (speed) {
    const { direction } = this.state;
    const { img, frameCount } = this.frameImages[this.frameState.name];
    const singleframe = img.width / frameCount;
    const emptySpace = singleframe * this.stats.emptySpace;

    let pos;
    if (direction === "left") {
      pos = this.posX - speed;
    } else {
      pos = this.posX + speed;
    }

    this.posX = Math.max(emptySpace, Math.min(pos, game.worldWidth - emptySpace));
  }
}

export { setMoveState };
