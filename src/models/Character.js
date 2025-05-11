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

      isAttackInitial: false,
      isAttacking: false,
      isDamaged: false,

      direction: "left",
    };

    this.spriteState = {
      spriteCount: null,
      frameInterval: null,
      currentSprite: 0,
      isMaxSprite: false,
      name: "",

      isJumping: false,
      isAttacking: false,
      isRunningAttacking: false,
    };

    this.characterPosX = 40;
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

        // Handle independent instant animation when jumping ends and there's no fall
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
      if (
        !this.spriteState.isAttacking &&
        !this.spriteState.isRunningAttacking
      ) {
        if (this.state.isRunning) this.spriteState.isRunningAttacking = true;
        else this.spriteState.isAttacking = true;

        // Handle instant attack independent animation while not removing last sprite sheet
        if (!this.isAttackInitial) {
          this.isAttackInitial = true;
          this.setSpriteCount();
        }
      }
    }
    if (isRunning || isWalking) {
      // Get current speed
      let speed;
      if (isRunning) speed = this.stats.runSpeed;
      else speed = this.stats.walkSpeed;

      this.characterPosX += this.getCharacterPosition(speed);
    }
  }

  getCharacterPosition(speed) {
    const { direction } = this.state;
    const { img, spriteCount } = this.spriteImages[this.spriteState.name];
    const singleSprite = img.width / spriteCount;
    const spriteEmptySpace = singleSprite * this.stats.spriteEmptySpace;

    let calculation;

    if (direction === "left") {
      calculation = this.characterPosX + -speed - spriteEmptySpace;
    } else {
      calculation = this.characterPosX + speed + spriteEmptySpace;
    }

    if (calculation <= 0) return 0;
    if (calculation >= game.canvasEl.width) return 0;
    return direction === "left" ? -speed : speed;
  }

  getCurrentAnimation() {
    const { state, spriteState } = this;
    // # Return state based on the order
    if (state.isDamaged) return "damage";
    // Animations independent from the active changing state
    // It needs to forwards only once
    if (spriteState.isRunningAttacking) return "runAttack";
    if (spriteState.isAttacking) return "attack";
    if (spriteState.isJumping) return "jump";
    //
    if (state.isRunning) return "run";
    if (state.isWalking) return "walk";
    return "idle";
  }

  setSpriteCount() {
    const animation = this.getCurrentAnimation();
    const { spriteState, spriteImages, state } = this;

    // Set initial sprite count if it's different animation
    if (spriteState.name !== animation) {
      const { spriteCount, frameInterval } = spriteImages[animation];
      spriteState.name = animation;
      spriteState.spriteCount = spriteCount;
      spriteState.frameInterval = frameInterval;
      spriteState.currentSprite = 0;
      this.isMaxSprite = false;
    }
    // Handle sprite loops or endings for specific sprites
    else {
      spriteState.currentSprite += this.isMaxSprite ? -1 : 1;

      if (spriteState.currentSprite === 0) {
        this.isMaxSprite = false;
        // Handle full attack animation state if repeats to not skip the last
        // If animation repeats do not skip last until it's shown
        if (spriteState.isRunningAttacking || spriteState.isAttacking) {
          if (spriteState.isRunningAttacking) {
            spriteState.isRunningAttacking = false;
          } else {
            spriteState.isAttacking = false;
          }
          if (!state.isAttacking) state.isAttackInitial = false;
        }
      } else if (spriteState.currentSprite >= spriteState.spriteCount - 1) {
        this.isMaxSprite = true;

        // Handle one way jumping animation
        if (spriteState.isJumping) spriteState.isJumping = false;
      }
    }

    this.currentTime = game.currentTime;
  }

  setAnimation({ ctx }) {
    const { img, spriteCount } = this.spriteImages[this.spriteState.name];
    const { currentSprite } = this.spriteState;
    const { height: canvasHeight } = game.canvasEl;

    const { width: imgWidth, height: imgHeight } = img;

    const imgSingleSprite = imgWidth / spriteCount;

    let imgPosX = this.characterPosX - imgSingleSprite / 2;
    const imgPosY = canvasHeight - imgHeight - this.characterPosY;

    // Clip character to the left
    if (this.state.direction === "left") {
      ctx.save();
      imgPosX = -(this.characterPosX + imgSingleSprite / 2);
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
    if (this.state.direction === "left") ctx.restore();
  }

  setImages() {
    this.loadedImages = true;
    this.setSpriteCount();
  }
}
