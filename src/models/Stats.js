export class Stats {
  constructor(
    moveSpeed,
    runSpeed,
    jumpSpeedInitial,
    jumpSpeedStep,
    fallSpeedStep,
    fallSpeedLimit,
    healthPoints
  ) {
    this.moveSpeed = moveSpeed;
    this.runSpeed = runSpeed;

    this.jumpSpeedInitial = jumpSpeedInitial;
    this.jumpSpeed = this.jumpSpeedInitial;
    this.jumpSpeedStep = jumpSpeedStep;
    this.jumpSpeedLimit = 0;

    this.fallSpeed = 0;
    this.fallSpeedStep = fallSpeedStep;
    this.fallSpeedLimit = fallSpeedLimit;

    this.healthPoints = healthPoints;
  }
}
