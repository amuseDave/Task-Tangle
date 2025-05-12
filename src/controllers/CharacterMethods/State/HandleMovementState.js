export function handleRunState() {
  if (this.state.isRunning) {
    this.posX = this.setMovePosition(this.stats.runSpeed);
  } else if (this.state.isWalking) {
    this.posX = this.setMovePosition(this.stats.walkSpeed);
  }
}

export function handleWalkState() {
  if (this.state.isWalking) {
    this.posX = this.setMovePosition(this.stats.walkSpeed);
  }
}
