import { warrior } from "../models/Warrior";

class PlayerController {
  constructor(character) {
    this.state = { isHoldingLeft: false, isHoldingRight: false };
    this.character = character;
  }

  handleKeyDown(e) {
    if (e.repeat) return;

    const { key } = e;

    if (key === "d" || key === "a") {
      this.character.setSpriteState("walk", key === "d" ? "right" : "left");

      if (key === "d") this.state.isHoldingRight = true;
      else this.state.isHoldingLeft = true;
    }
  }

  handleKeyUp(e) {
    const { key } = e;

    if (key !== "d" && key !== "a") return;

    if (key === "d") this.state.isHoldingRight = false;
    else this.state.isHoldingLeft = false;

    if (!this.state.isHoldingLeft && !this.state.isHoldingRight) {
      this.character.setSpriteState("idle");
    } else {
      this.character.setSpriteState("walk", key === "d" ? "left" : "right");
    }
  }
}

export const playerController = new PlayerController(warrior);
