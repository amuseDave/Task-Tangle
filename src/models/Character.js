export class Character {
  constructor(spriteImages) {
    this.loadedImages = false;
    this.spriteImages = spriteImages;

    this.spriteState = "idle";
    this.spriteCount = 1;
    this.spriteAdd = true;

    this.direction = "right";

    this.characterPosX = 0;
  }

  setSpriteState(spriteState, direction) {
    const isSame = spriteState === this.spriteState && direction === this.direction;

    if (isSame) return;

    this.spriteCount = 1;
    this.spriteState = spriteState;
    this.direction = direction;
  }

  handleSpriteState() {
    const max = this.spriteImages[this.spriteState].spriteCount - 1;

    if (this.spriteCount >= max) this.spriteAdd = false;
    else if (this.spriteCount <= 1) this.spriteAdd = true;

    this.spriteCount += this.spriteAdd ? 1 : -1;
  }

  setAnimation({ ctx }) {
    const { img, spriteCount } = this.spriteImages[this.spriteState];
    const { width: imgWidth, height: imgHeight } = img;

    const imgSingleSprite = imgWidth / spriteCount;

    let imgPosX = this.characterPosX - imgSingleSprite / 2 + 14;
    const imgPosY = 917 - imgHeight;

    if (this.spriteState === "walk") {
      if (this.direction === "left") {
        ctx.save();
        imgPosX = -(this.characterPosX + imgSingleSprite / 2 + 14);
        ctx.scale(-1, 1);
        this.characterPosX -= 1;
      } else {
        this.characterPosX += 1;
      }
    }

    ctx.drawImage(
      img,
      imgSingleSprite * this.spriteCount,
      0,
      imgSingleSprite,
      imgHeight,
      imgPosX,
      imgPosY,
      imgSingleSprite,
      imgHeight
    );
    ctx.restore();
  }

  setImages() {
    this.loadedImages = true;
  }
}
