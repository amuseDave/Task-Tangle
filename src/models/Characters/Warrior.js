import { warriorImages } from "../../assets/warrior/warrior.js";

import { setFrames } from "../../controllers/CharacterMethods/setFrames.js";
import {
  setState,
  setRunAttackState,
  setJumpState,
  setMoveState,
} from "../../controllers/CharacterMethods/State/StateMethods.js";
import { Stats } from "./Stats.js";

function warriorSetState() {
  setState.call(this);
  setJumpState.call(this);
  setMoveState.call(this);
  setRunAttackState.call(this);
}

function getWarriorActiveFrameName() {
  const { state } = this;
  if (state.isHurt) return "hurt";
  if (state.animationLock) return state.animationLock;
  if (state.isFalling) return "fall";
  if (state.isRunning) return "run";
  if (state.isWalking) return "walk";
  return "idle";
}

export const warrior = {
  frameImages: warriorImages,
  stats: new Stats(0.2, 1.2, 100, 0.1, 0.1, 5, 10, 2, 5, 5, 0.1, 0.2),
  setState: warriorSetState,
  setFrames,
  getActiveFrameName: getWarriorActiveFrameName,
};
