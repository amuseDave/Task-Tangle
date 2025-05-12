function handleAttackState() {
  if (this.state.isAttacking && !this.isAttackingInitial) {
    this.isAttackingInitial = true;
    this.state.isAttackingAnimation = true;

    this.setSpriteCount();
  }
}

function handleRunAttackState() {
  // Handle instant attack independent animation while not removing last sprite sheet

  if (this.state.isAttacking && !this.state.isAttackingInitial) {
    this.state.isAttackingInitial = true;
    if (this.state.isRunning) this.state.isAttackingRunningAnimation = true;
    else this.state.isAttackingAnimation = true;

    this.setSpriteCount();
  }
}

export { handleAttackState, handleRunAttackState };
