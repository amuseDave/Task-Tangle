function setEndRunAttack() {
  this.state.isAttackingRunningAnimation = false;
  this.state.isAttackingAnimation = false;
}

function setEndAttack() {
  this.state.isAttackingAnimation = false;
}

function setCustomEndAttackSprite(fn) {
  return function () {
    if (this.state.isAttacking) {
      this.state.isAttacking = false;

      fn.call(this);

      this.state.isAnimating = false;
      this.state.attackDirection = this.state.direction;
    }
  };
}

const setEndRunAttackSprite = setCustomEndAttackSprite(setEndRunAttack);
const setEndAttackSprite = setCustomEndAttackSprite(setEndAttack);

export { setEndAttackSprite, setEndRunAttackSprite };
