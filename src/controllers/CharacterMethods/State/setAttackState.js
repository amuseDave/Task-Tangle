function setRunAttack() {
  if (this.state.isRunning) this.state.animationLock = "runAttack";
  else this.state.animationLock = "attack";
}

function setAttack() {
  this.state.animationLock = "attack";
}

function setCustomAttackState(fn) {
  return function () {
    if (this.state.isAttack && !this.state.animationLock) {
      fn.call(this);
      this.state.attackDirection = this.state.direction;
    }
  };
}

const setRunAttackState = setCustomAttackState(setRunAttack);
const setAttackState = setCustomAttackState(setAttack);

export { setAttackState, setRunAttackState };
