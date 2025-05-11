export class Stats {
  constructor(
    walkSpeed,
    runSpeed,
    jumpSpeedInitial,
    jumpSpeedStep,
    fallSpeedStep,
    fallSpeedLimit,
    healthPoints,
    spriteEmptySpace
  ) {
    this.walkSpeed = walkSpeed;
    this.runSpeed = runSpeed;

    this.jumpSpeedInitial = jumpSpeedInitial;
    this.jumpSpeed = this.jumpSpeedInitial;
    this.jumpSpeedStep = jumpSpeedStep;
    this.jumpSpeedLimit = 0;

    this.fallSpeed = 0;
    this.fallSpeedStep = fallSpeedStep;
    this.fallSpeedLimit = fallSpeedLimit;

    this.spriteEmptySpace = spriteEmptySpace;

    this.healthPoints = healthPoints;
  }
}
