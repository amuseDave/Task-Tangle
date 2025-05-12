function setJumpState() {
  if (!this.state.isFalling && this.state.isJumping) {
    // Handle independent instant animation when jumping ends and there's no fall
    if (!this.state.isAnimating && !this.state.isJumpingInitial) {
      this.state.isJumpingAnimation = true;
      this.state.isJumpingInitial = true;
      this.setSprite();
    }

    if (0 >= this.stats.jumpSpeed) {
      this.state.isFalling = true;
      this.state.isJumping = false;
      this.state.isJumpingInitial = false;
      this.stats.jumpSpeed = this.stats.jumpSpeedInitial;
    } else {
      this.posY += this.stats.jumpSpeed;
      this.stats.jumpSpeed -= this.stats.jumpSpeedStep;
    }
  }
}

export { setJumpState };
