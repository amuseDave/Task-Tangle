import { game } from "../../../models/Game";

function setBaseSpriteCount() {
  const animation = this.getSpriteName();
  const { spriteState, spriteImages } = this;

  // Set initial sprite count if it's different animation
  if (spriteState.name !== animation) {
    const { spriteCount, frameInterval, img } = spriteImages[animation];

    spriteState.name = animation;
    spriteState.spriteCount = spriteCount;
    spriteState.frameInterval = frameInterval;
    spriteState.currentSprite = 0;
    this.isMaxSprite = false;
  }
  // Handle sprite loops or endings for specific sprites
  else {
    spriteState.currentSprite += 1;
    if (spriteState.currentSprite >= spriteState.spriteCount - 1) {
      spriteState.currentSprite = 0;
      this.setEndSprite();
    }
  }

  this.currentTime = game.currentTime;
}

export { setBaseSpriteCount };
