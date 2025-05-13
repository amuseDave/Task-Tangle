class Stats {
  constructor(
    emptySpace,
    walkSpeed,
    healthPoints,
    fallSpeed,
    fallSpeedStep,
    fallSpeedLimit,
    attackDamage = null,
    runSpeed = null,
    jumpSpeedInitial = null,
    jumpSpeed = null,
    jumpSpeedStep = null
  ) {
    this.emptySpace = emptySpace;

    this.walkSpeed = walkSpeed;
    this.healthPoints = healthPoints;

    this.fallSpeed = fallSpeed;
    this.fallSpeedStep = fallSpeedStep;
    this.fallSpeedLimit = fallSpeedLimit;

    this.attackDamage = attackDamage;
    this.runSpeed = runSpeed;

    this.jumpSpeedInitial = jumpSpeedInitial;
    this.jumpSpeed = jumpSpeed;
    this.jumpSpeedStep = jumpSpeedStep;
  }
}

export { Stats };
