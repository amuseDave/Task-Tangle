import {
  skeletonIdle,
  skeletonWalk,
  skeletonAttack,
  skeletonShot,
  skeletonShot2,
  skeletonArrow,
} from "../../assets/skeleton_archer/skeletonArcher";

import {
  handleBaseState,
  handleWalkState,
  handleAttackState,
} from "../../controllers/CharacterMethods/State/StateMethods.js";

import { setBaseSpriteCount } from "../../controllers/CharacterMethods/SpriteState/SpriteMethods";

import { setMovePosition } from "../../controllers/CharacterMethods/SetMovePosition.js";

import { SpriteState } from "../SpriteState.js";
import { Character } from "./Character.js";
import { loadImages } from "../../utils";

const skeletonArcherImages = {
  idle: { img: skeletonIdle, spriteCount: 7, frameInterval: 180 },
  walk: { img: skeletonWalk, spriteCount: 8, frameInterval: 100 },
  attack: { img: skeletonAttack, spriteCount: 5, frameInterval: 90 },
  shoot: { img: skeletonShot, spriteCount: 15, frameInterval: 100 },
  shoot2: { img: skeletonShot2, spriteCount: 15, frameInterval: 100 },
  arrow: { img: skeletonArrow, spriteCount: null, frameInterval: null },
};

const skeletonArcherStats = {
  walkSpeed: 1.1,
  healthPoints: 50,

  fallSpeed: 0.1,
  fallSpeedStep: 0.1,
  fallSpeedLimit: 5,

  attackDamage: 5,
};

const skeletonArcherState = {
  isWalking: false,
  isHurt: false,
  direction: "left",

  isAttacking: false,
  isAttackingInitial: false,
  isAttackingAnimation: false,

  isShooting: false,
  isShootingInitial: false,
  isShootingOneAnimation: false,
  isShootingTwoAnimation: false,

  isFalling: false,
};

function skeletonArcherSetState() {
  handleBaseState.call(this);
  handleAttackState.call(this);
  handleWalkState.call(this);
}

function getSkeletonArcherSpriteName() {
  const { state } = this;
  if (state.isHurt) return "damage";

  if (state.isAttackingAnimation) return "attack";

  if (state.isShootingOneAnimation) return "shoot";
  if (state.isShooting2OneAnimation) return "shoot2";

  if (state.isWalking) return "walk";

  return "idle";
}

export const skeletonArcher = new Character({
  spriteImages: skeletonArcherImages,
  stats: skeletonArcherStats,
  state: skeletonArcherState,
  spriteState: new SpriteState(0.2),

  setState: skeletonArcherSetState,
  setSprite: setBaseSpriteCount,
  setEndSprite: () => {},

  setMovePosition,

  getSpriteName: getSkeletonArcherSpriteName,
});

loadImages(skeletonArcher.spriteImages).then(() => skeletonArcher.setImages());
