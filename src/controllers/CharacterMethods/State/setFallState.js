function setFallState() {
  if (this.state.isFalling) {
    this.posY -= this.stats.fallSpeed;
    if (this.stats.fallSpeedLimit > this.stats.fallSpeed) {
      this.stats.fallSpeed += this.stats.fallSpeedStep;
    }
    // If the ground is reached disable fall
    if (this.posY - this.stats.fallSpeed <= 0) {
      this.state.isFalling = false;
      this.stats.fallSpeed = 0;
      this.posY = 0;
    }
  }
}

export { setFallState };
