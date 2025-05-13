import { skeletonArcherImages } from "../../assets/skeleton_archer/skeletonArcher";

import {
  setState,
  setAttackState,
  setMoveState,
} from "../../controllers/CharacterMethods/State/StateMethods.js";

import { setFrames } from "../../controllers/CharacterMethods/setFrames";

import { Character } from "./Character.js";
import { loadImages } from "../../utils";
import { Stats } from "./Stats.js";

function skeletonArcherSetState() {
  setState.call(this);
  setAttackState.call(this);
  setMoveState.call(this);
}

function getSkeletonArcherActiveFrameName() {
  const { state } = this;
  if (state.isHurt) return "hurt";
  if (state.animationLock) return state.animationLock;
  if (state.isFalling) return "fall";
  if (state.isWalking) return "walk";
  return "idle";
}

export const skeletonArcher = {
  frameImages: skeletonArcherImages,
  stats: new Stats(0.2, 1.1, 50, 0.1, 0.1, 5, 5),
  setState: skeletonArcherSetState,
  setFrames: setFrames,

  getActiveFrameName: getSkeletonArcherActiveFrameName,
};
