import { game } from "../models/Game";

export class PlayerController {
  constructor(character) {
    this.state = {
      aPressed: false,
      dPressed: false,

      wPressed: false,
      " Pressed": false,

      shiftPressed: false,

      ePressed: false,
    };
    this.character = character;

    this.handleKeyDownBound = this.handleKeyDown.bind(this);
    this.handleKeyUpBound = this.handleKeyUp.bind(this);
    this.handleMouseDownBound = this.handleMouseDown.bind(this);
    this.handleMouseUpBound = this.handleMouseUp.bind(this);
  }

  handleKeyDown(e) {
    if (e.repeat) return;
    const key = e.key.toLowerCase();

    if (this.state[`${key}Pressed`] === undefined) return;
    this.state[`${key}Pressed`] = true;

    if (key === "d" || key === "a") {
      this.character.state.isWalking = true;
      this.character.state.direction = key === "d" ? "right" : "left";
      if (this.state.shiftPressed) this.character.state.isRunning = true;
    } else if (key === "w" || key === " ") {
      if (!this.character.state.isJumping && !this.character.state.isFalling) {
        this.character.state.isJumping = true;
      }
    } else if (key === "shift") {
      if (this.character.state.isWalking) this.character.state.isRunning = true;
    } else if (key === "e") {
      for (let i = 0; i < game.interactiveObjects.length; i++) {
        const object = game.interactiveObjects[i];
        if (object.isActive) {
          object.interact();
        }
      }
    }
  }

  handleKeyUp(e) {
    const key = e.key.toLowerCase();

    if (this.state[`${key}Pressed`] === undefined) return;
    this.state[`${key}Pressed`] = false;

    // Hande walking state with switches if other key is still down
    if (key === "d" || key === "a") {
      if (this.state.aPressed || this.state.dPressed) {
        this.character.state.direction = key === "d" ? "left" : "right";
      } else {
        this.character.state.isWalking = false;
        this.character.state.isRunning = false;
      }
    } else if (key === "shift") {
      this.character.state.isRunning = false;
    }
  }

  handleMouseDown(e) {
    if (e.button === 0 && !this.character.state.animationLock) {
      this.character.state.isAttack = true;
    } else if (e.button !== 0) {
      this.character.state.isHurt = true;
    }
  }
  handleMouseUp(e) {}
  setEvents() {
    window.addEventListener("keydown", this.handleKeyDownBound);
    window.addEventListener("keyup", this.handleKeyUpBound);
    window.addEventListener("mousedown", this.handleMouseDownBound);
    window.addEventListener("mouseup", this.handleMouseUpBound);
  }

  removeEvents() {
    window.removeEventListener("keydown", this.handleKeyDownBound);
    window.removeEventListener("keyup", this.handleKeyUpBound);
    window.removeEventListener("mousedown", this.handleMouseDownBound);
    window.removeEventListener("mouseup", this.handleMouseUpBound);
  }
}
