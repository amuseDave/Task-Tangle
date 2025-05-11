import { warrior } from "../models/Warrior";

class PlayerController {
  constructor(character) {
    this.state = {
      aPressed: false,
      dPressed: false,

      wPressed: false,
      " Pressed": false,

      shiftPressed: false,
    };
    this.character = character;
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
      this.character.state.isJump = true;
    } else if (key === "shift") {
      if (this.character.state.isWalking) this.character.state.isRunning = true;
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
    } else if (key === " " || key === "w") {
      if (!this.state[" Pressed"] && !this.state.wPressed) {
        this.character.state.isJump = false;
      }
    } else if (key === "shift") {
      this.character.state.isRunning = false;
    }
  }

  handleMouseDown(e) {
    if (e.button !== 0) return;
    this.character.state.isAttacking = true;
  }

  handleMouseUp() {
    this.character.state.isAttacking = false;
  }
}

export const playerController = new PlayerController(warrior);
