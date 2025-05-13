import { game } from "../Game";

export class Character {
  constructor({
    frameImages,

    setState,
    setFrames,
    stats,
    emptySpace,

    getActiveFrameName,

    setMovePosition,
  }) {
    this.loadedImages = false; // MUST
    this.frameImages = frameImages; // MUST

    this.state = {};
    this.frameState = { emptySpace: 0.2 };
    this.stats = stats;

    this.setState = setState;
    this.setFrames = setFrames;
    this.getActiveFrameName = getActiveFrameName;

    this.posX = 444;
    this.posY = 0;
  }

  setAnimation() {
    const { img, frameCount, frame } = this.frameImages[this.frameState.name];
    const { emptySpace } = this.frameState;
    const { direction, attackDirection, isAttack } = this.state;

    const { height: canvasHeight } = game.canvasEl;
    const { width: imgWidth, height: imgHeight } = img;

    const imgSingleframe = imgWidth / frameCount;

    let imgPosX = this.posX - game.camera.x - imgSingleframe / 2;
    const imgPosY = canvasHeight - imgHeight - this.posY;

    const activeDirection = isAttack ? attackDirection : direction;

    // Clip character to the left
    if (activeDirection === "left") {
      game.ctx.save();
      imgPosX = -(this.posX - game.camera.x + imgSingleframe / 2);
      game.ctx.scale(-1, 1);
    }

    game.ctx.drawImage(
      img,
      imgSingleframe * frame,
      0,
      imgSingleframe,
      imgHeight,
      imgPosX,
      imgPosY,
      imgSingleframe,
      imgHeight
    );
    if (activeDirection === "left") game.ctx.restore();

    // Test hitbox
    const hitBoxWidth = imgSingleframe - imgSingleframe * (emptySpace * 3);
    game.ctx.fillRect(
      this.posX - game.camera.x - hitBoxWidth / 2,
      game.canvasEl.height - this.posY - imgHeight,
      hitBoxWidth,
      2
    );
    ///
  }
}
