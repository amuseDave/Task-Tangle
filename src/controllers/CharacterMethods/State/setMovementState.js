function setRunState() {
  if (this.state.isRunning) {
    this.posX = this.setMovePosition(this.stats.runSpeed);
  } else if (this.state.isWalking) {
    this.posX = this.setMovePosition(this.stats.walkSpeed);
  }
}

function setWalkState() {
  if (this.state.isWalking) {
    this.posX = this.setMovePosition(this.stats.walkSpeed);
  }
}

export { setWalkState, setRunState };
