function setEndRunAttackSprite() {
  if (this.state.isAttacking) {
    this.state.isAttacking = false;
    this.state.isAttackingInitial = false;
    this.state.isAttackingRunningAnimation = false;
    this.state.isAttackingAnimation = false;
  }
}

function setEndAttackSprite() {
  if (this.state.isAttacking) {
    this.state.isAttacking = false;
    this.state.isAttackingAnimation = false;
    this.state.isAttackingInitial = false;
  }
}

export { setEndAttackSprite, setEndRunAttackSprite };
