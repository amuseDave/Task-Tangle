function setJumpState() {
  if (!this.state.isFalling && this.state.isJumping) {
    if (0 >= this.stats.jumpSpeed) {
      this.state.isFalling = true;

      this.state.isJumping = false;
      this.state.isJumpAnimation = false;
      this.state.isJumpInitial = false;

      this.stats.jumpSpeed = this.stats.jumpSpeedInitial;
    } else {
      this.posY += this.stats.jumpSpeed;
      this.stats.jumpSpeed -= this.stats.jumpSpeedStep;
    }
  }
}

export { setJumpState };
