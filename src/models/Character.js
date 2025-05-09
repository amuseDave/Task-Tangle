import { game } from "./Game";

export class Character {
  constructor(spriteImages, stats) {
    this.loadedImages = false; // MUST
    this.spriteImages = spriteImages; // MUST

    this.stats = stats;

    this.state = {
      isRunning: false,
      isWalking: false,

      isJumping: false,
      isJump: false,
      isFalling: false,

      isAttacking: false,
      isDamaged: false,

      direction: "right",
    };

    this.spriteState = {
      spriteCount: null,
      currentSprite: 0,
      max: false,
      name: "",

      isJumping: false,
      isAttacking: false,
      isRunningAttacking: false,
    };

    this.characterPosX = 800;
    this.characterPosY = 0;

    this.currentTime = 0;
  }

  setState() {
    const {
      isRunning,
      isWalking,

      isJumping,
      isJump,
      isFalling,

      direction,

      isAttacking,
    } = this.state;

    if (isRunning) {
      const { runSpeed } = this.stats;
      this.characterPosX += direction === "left" ? -runSpeed : runSpeed;
    } else if (isWalking) {
      const { walkSpeed } = this.stats;
      this.characterPosX += direction === "left" ? -walkSpeed : walkSpeed;
    }

    if (isFalling) {
      this.characterPosY -= this.stats.fallSpeed;
      if (this.stats.fallSpeedLimit > this.stats.fallSpeed) {
        this.stats.fallSpeed += this.stats.fallSpeedStep;
      }
      // If the ground is reached disable fall
      if (this.characterPosY - this.stats.fallSpeed <= 0) {
        this.state.isFalling = false;
        this.stats.fallSpeed = 0;
        this.characterPosY = 0;
      }
    } else if (isJumping || isJump) {
      if (!isJumping) {
        this.state.isJumping = true;

        // Handle independent animation
        if (!this.spriteState.isJumping) {
          this.spriteState.isJumping = true;
          this.setSpriteCount();
        }
      }

      if (this.stats.jumpSpeedLimit >= this.stats.jumpSpeed) {
        this.state.isFalling = true;
        this.state.isJumping = false;
        this.stats.jumpSpeed = this.stats.jumpSpeedInitial;
      } else {
        this.characterPosY += this.stats.jumpSpeed;
        this.stats.jumpSpeed -= this.stats.jumpSpeedStep;
      }
    }

    if (isAttacking) {
      if (!this.spriteState.isAttacking && !this.spriteState.isRunningAttacking) {
        if (this.state.isRunning) this.spriteState.isRunningAttacking = true;
        else this.spriteState.isAttacking = true;
        this.setSpriteCount();
      }
    }
  }

  getCurrentAnimation() {
    // # Return state based on the order
    if (this.state.isDamaged) return "damage";
    // Animations independent from the active changing state
    // It needs to forwards only once
    if (this.spriteState.isRunningAttacking) return "runAttack";
    if (this.spriteState.isAttacking) return "attack";
    if (this.spriteState.isJumping) return "jump";
    //
    if (this.state.isRunning) return "run";
    if (this.state.isWalking) return "walk";
    return "idle";
  }

  setSpriteCount() {
    const animation = this.getCurrentAnimation();

    // Set initial sprite count if it's different animation
    if (this.spriteState.name !== animation) {
      this.spriteState.name = animation;
      this.spriteState.spriteCount = this.spriteImages[this.spriteState.name].spriteCount;
      this.spriteState.currentSprite = 0;
      this.max = false;
    } else {
      this.spriteState.currentSprite += this.max ? -1 : 1;

      if (this.spriteState.currentSprite === 0) {
        this.max = false;
        if (this.spriteState.isAttacking) this.spriteState.isAttacking = false;
      } else if (this.spriteState.currentSprite >= this.spriteState.spriteCount - 1) {
        this.max = true;
        if (this.spriteState.isRunningAttacking)
          this.spriteState.isRunningAttacking = false;
        if (this.spriteState.isJumping) this.spriteState.isJumping = false;
      }
    }

    this.currentTime = game.currentTime;
  }

  setAnimation({ ctx }) {
    const { img, spriteCount } = this.spriteImages[this.spriteState.name];
    const { currentSprite } = this.spriteState;

    const { width: imgWidth, height: imgHeight } = img;

    const imgSingleSprite = imgWidth / spriteCount;

    let imgPosX = this.characterPosX - imgSingleSprite / 2 + 14;
    const imgPosY = 917 - imgHeight - this.characterPosY;

    // Clip character to the left
    if (this.state.direction === "left") {
      ctx.save();
      imgPosX = -(this.characterPosX + imgSingleSprite / 2 + 14);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(
      img,
      imgSingleSprite * currentSprite,
      0,
      imgSingleSprite,
      imgHeight,
      imgPosX,
      imgPosY,
      imgSingleSprite,
      imgHeight
    );
    ctx.restore();
  }

  setImages() {
    this.loadedImages = true;
    this.setSpriteCount();
  }
}
