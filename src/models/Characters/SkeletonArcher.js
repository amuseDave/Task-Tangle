import {
  Idle,
  Walk,
  Attack,
  Shoot,
  Shoot2,
  Arrow,
} from "../../assets/skeleton_archer/skeletonArcher";

import {
  setState,
  setAttackState,
  setMoveState,
} from "../../controllers/CharacterMethods/State/StateMethods.js";

import { setFrames } from "../../controllers/CharacterMethods/setFrames";

import { Character } from "./Character.js";
import { loadImages } from "../../utils";
import { Stats } from "../Stats";

const skeletonArcherImages = {
  idle: { img: Idle, frameCount: 7, frameInterval: 120, frame: 0 },
  walk: { img: Walk, frameCount: 8, frameInterval: 100, frame: 0 },
  attack: { img: Attack, frameCount: 5, frameInterval: 90, frame: 0 },
  shoot: { img: Shoot, frameCount: 15, frameInterval: 100, frame: 0 },
  shoot2: { img: Shoot2, frameCount: 15, frameInterval: 100, frame: 0 },
  arrow: { img: Arrow },
};

const skeletonArcherStats = new Stats(0.2, 1.1, 50, 0.1, 0.1, 5, 5);

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

export const skeletonArcher = new Character({
  frameImages: skeletonArcherImages,
  stats: skeletonArcherStats,
  setState: skeletonArcherSetState,
  setFrames: setFrames,

  getActiveFrameName: getSkeletonArcherActiveFrameName,
});

loadImages(skeletonArcher.frameImages).then(() => skeletonArcher.setImages());
