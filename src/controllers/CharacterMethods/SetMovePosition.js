import { game } from "../../models/Game";

function setMovePosition(speed) {
  const { direction } = this.state;
  const { img, spriteCount } = this.spriteImages[this.spriteState.name];
  const singleSprite = img.width / spriteCount;
  const emptySpace = singleSprite * this.spriteState.emptySpace;

  let pos;
  if (direction === "left") {
    pos = this.posX - speed;
  } else {
    pos = this.posX + speed;
  }

  return Math.max(emptySpace, Math.min(pos, game.worldWidth - emptySpace));
}

export { setMovePosition };
