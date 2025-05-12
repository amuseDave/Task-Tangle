import { game } from "../Game";

export class Character {
  constructor({
    spriteImages,

    stats,
    state,
    spriteState,

    setState,
    setSprite,
    setEndSprite,

    getSpriteName,

    setMovePosition,
  }) {
    this.loadedImages = false; // MUST
    this.spriteImages = spriteImages; // MUST

    this.stats = stats;
    this.state = state;
    this.spriteState = spriteState;

    this.setState = setState;
    this.setSprite = setSprite;

    this.setEndSprite = setEndSprite;

    this.setMovePosition = setMovePosition;

    this.getSpriteName = getSpriteName;

    this.posX = 444;
    this.posY = 0;

    this.currentTime = 0;
  }

  setAnimation() {
    const { img, spriteCount } = this.spriteImages[this.spriteState.name];
    const { currentSprite, emptySpace } = this.spriteState;
    const { direction, attackDirection, isAttacking } = this.state;

    const { height: canvasHeight } = game.canvasEl;
    const { width: imgWidth, height: imgHeight } = img;

    const imgSingleSprite = imgWidth / spriteCount;

    const hitBoxWidth = imgSingleSprite - imgSingleSprite * (emptySpace * 3);
    game.ctx.fillRect(
      this.posX - game.camera.x - hitBoxWidth / 2,
      game.canvasEl.height - this.posY - imgHeight,
      hitBoxWidth,
      2
    );

    let imgPosX = this.posX - game.camera.x - imgSingleSprite / 2;
    const imgPosY = canvasHeight - imgHeight - this.posY;

    const activeDirection = isAttacking ? attackDirection : direction;

    // Clip character to the left
    if (activeDirection === "left") {
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
    if (activeDirection === "left") game.ctx.restore();
  }

  setImages() {
    this.loadedImages = true;
    this.setSprite();
  }
}
