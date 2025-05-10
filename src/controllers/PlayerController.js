import { warrior } from "../models/Warrior";

class PlayerController {
  constructor(character) {
    this.state = {
      aPressed: false,
      dPressed: false,

      wPressed: false,
      spacePressed: false,

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
    } else if (key === "w" || key === "space") {
      this.character.state.isJump = true;
    } else if (key === "shift") {
      this.character.state.isRunning = true;
    }

    this.character.setSpriteCount();
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
      }
    } else if (key === "space" || key === "w") {
      if (!this.state.spacePressed && !this.state.wPressed) {
        this.character.state.isJump = false;
      }
    } else if (key === "shift") {
      this.character.state.isRunning = false;
    }
  }
}

export const playerController = new PlayerController(warrior);
