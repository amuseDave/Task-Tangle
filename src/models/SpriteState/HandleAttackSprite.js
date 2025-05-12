function handleRunAttackSprite() {
  if (this.state.isAttacking) {
    this.state.isAttacking = false;
    this.state.isAttackingInitial = false;
    this.state.isAttackingRunningAnimation = false;
    this.state.isAttackingAnimation = false;
  }
}

function handleAttackSprite() {
  if (this.state.isAttacking) {
    this.state.isAttacking = false;
    this.state.isAttackingAnimation = false;
    this.state.isAttackingInitial = false;
  }
}

export { handleAttackSprite, handleRunAttackSprite };
