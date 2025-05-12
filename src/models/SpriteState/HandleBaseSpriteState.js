function handleBaseSpriteCount() {
  const animation = this.getSpriteName();
  const { spriteState, spriteImages } = this;

  // Set initial sprite count if it's different animation
  if (spriteState.name !== animation) {
    const { spriteCount, frameInterval } = spriteImages[animation];
    spriteState.name = animation;
    spriteState.spriteCount = spriteCount;
    spriteState.frameInterval = frameInterval;
    spriteState.currentSprite = 0;
    this.isMaxSprite = false;
  }
  // Handle sprite loops or endings for specific sprites
  else {
    spriteState.currentSprite += this.isMaxSprite ? -1 : 1;

    if (spriteState.currentSprite === 0) {
      console.log(spriteState.currentSprite);
      this.isMaxSprite = false;
      // Handle Min Sprite for 1 loop animations
      this.handleMinSprite();
    } else if (spriteState.currentSprite >= spriteState.spriteCount - 1) {
      this.isMaxSprite = true;
      // Handle Max Sprites for one way one sprite animations
      this.handleMaxSprite();
    }
  }

  this.updateCurrentTime();
}

export { handleBaseSpriteCount };
