import { game } from "../Game";

export class Character {
  constructor({
    spriteImages,

    stats,
    state,
    spriteState,

    setState,
    setSpriteCount,
    handleMinSprite,
    handleMaxSprite,

    getSpriteName,
  }) {
    this.loadedImages = false; // MUST
    this.spriteImages = spriteImages; // MUST

    this.stats = stats;
    this.state = state;
    this.spriteState = spriteState;

    this.setState = setState;
    this.setSpriteCount = setSpriteCount;
    this.handleMinSprite = handleMinSprite;
    this.handleMaxSprite = handleMaxSprite;

    this.getSpriteName = getSpriteName;

    this.posX = 22;
    this.posY = 0;

    this.currentTime = 0;
  }

  handleMovePosition(speed) {
    const { direction } = this.state;
    const { img, spriteCount } = this.spriteImages[this.spriteState.name];
    const singleSprite = img.width / spriteCount;
    const emptySpace = singleSprite * this.stats.spriteEmptySpace;

    let pos;
    if (direction === "left") {
      pos = this.posX - speed;
    } else {
      pos = this.posX + speed;
    }

    return Math.max(emptySpace, Math.min(pos, game.worldWidth - emptySpace));
  }

  setAnimation() {
    const { img, spriteCount } = this.spriteImages[this.spriteState.name];
    const { currentSprite } = this.spriteState;

    const { height: canvasHeight } = game.canvasEl;
    const { width: imgWidth, height: imgHeight } = img;

    const imgSingleSprite = imgWidth / spriteCount;

    let imgPosX = this.posX - game.camera.x - imgSingleSprite / 2;
    const imgPosY = canvasHeight - imgHeight - this.posY;

    // Clip character to the left
    if (this.state.direction === "left") {
      game.ctx.save();
      imgPosX = -(this.posX - game.camera.x + imgSingleSprite / 2);
      game.ctx.scale(-1, 1);
    }
    game.ctx.drawImage(
      img,
      imgSingleSprite * currentSprite,
      0,
      imgSingleSprite,
      imgHeight,
      imgPosX,
      imgPosY,
      imgSingleSprite,
      imgHeight
    );
    if (this.state.direction === "left") game.ctx.restore();
  }

  setImages() {
    this.loadedImages = true;
    this.setSpriteCount();
  }

  updateCurrentTime() {
    this.currentTime = game.currentTime;
  }
}
