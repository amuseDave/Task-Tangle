export function handleRunState() {
  if (this.state.isRunning) {
    this.posX = this.handleMovePosition(this.stats.runSpeed);
  } else if (this.state.isWalking) {
    this.posX = this.handleMovePosition(this.stats.walkSpeed);
  }
}

export function handleWalkState() {
  if (this.state.isWalking) {
    this.posX = this.handleMovePosition(this.stats.walkSpeed);
  }
}
