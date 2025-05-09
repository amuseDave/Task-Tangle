import { warrior } from "../models/Warrior";

const state = { isHoldingLeft: false, isHoldingRight: false };

export function keyDown(e) {
  if (e.repeat) return;

  const { key } = e;

  if (key === "d" || key === "a") {
    warrior.setSpriteState("walk", key === "d" ? "right" : "left");

    if (key === "d") state.isHoldingRight = true;
    else state.isHoldingLeft = true;
  }
}
export function keyUp(e) {
  const { key } = e;

  if (key !== "d" && key !== "a") return;

  if (key === "d") state.isHoldingRight = false;
  else state.isHoldingLeft = false;

  if (!state.isHoldingLeft && !state.isHoldingRight) {
    warrior.setSpriteState("idle");
  } else {
    warrior.setSpriteState("walk", key === "d" ? "left" : "right");
  }
}
