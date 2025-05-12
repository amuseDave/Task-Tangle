class SpriteState {
  constructor(emptySpace) {
    this.spriteCount = null;
    this.frameInterval = null;
    this.currentSprite = 0;
    this.isMaxSprite = false;
    this.name = "";

    this.emptySpace = emptySpace;
  }
}

export { SpriteState };
