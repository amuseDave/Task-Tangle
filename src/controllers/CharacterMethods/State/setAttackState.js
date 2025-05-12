function setRunAttack() {
  if (this.state.isRunning) this.state.isAttackingRunningAnimation = true;
  else this.state.isAttackingAnimation = true;
}

function setAttack() {
  this.state.isAttackingAnimation = true;
}

function setCustomAttackState(fn) {
  // Handle instant attack one way separate from the rest animation
  return function () {
    if (this.state.isAttacking && !this.state.isAnimating) {
      this.state.isAnimating = true;
      fn.call(this);
      this.state.attackDirection = this.state.direction;
      this.setSprite();
    }
  };
}

const setRunAttackState = setCustomAttackState(setRunAttack);
const setAttackState = setCustomAttackState(setAttack);

export { setAttackState, setRunAttackState };
