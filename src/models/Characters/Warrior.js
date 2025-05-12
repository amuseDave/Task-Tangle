import {
  warriorAttack1,
  warriorHurt,
  warriorIdle,
  warriorAttackRun1,
  warriorJump,
  warriorRun,
  warriorWalk,
} from "../../assets/warrior/warrior.js";

import { Character } from "./Character.js";
import { loadImages } from "../../utils.js";

import {
  setBaseState,
  setRunAttackState,
  setRunState,
  setJumpState,
} from "../../controllers/CharacterMethods/State/StateMethods.js";

import {
  setBaseSpriteCount,
  setEndJumpSprite,
  setEndRunAttackSprite,
} from "../../controllers/CharacterMethods/SpriteState/SpriteMethods";

import { setMovePosition } from "../../controllers/CharacterMethods/SetMovePosition.js";
import { SpriteState } from "../SpriteState.js";

const warriorImages = {
  idle: { img: warriorIdle, spriteCount: 6, frameInterval: 140 },
  walk: { img: warriorWalk, spriteCount: 8, frameInterval: 110 },
  run: { img: warriorRun, spriteCount: 6, frameInterval: 110 },
  jump: { img: warriorJump, spriteCount: 5, frameInterval: 110 },
  attack: { img: warriorAttack1, spriteCount: 4, frameInterval: 100 },
  runAttack: { img: warriorAttackRun1, spriteCount: 4, frameInterval: 100 },
  hurt: { img: warriorHurt, spriteCount: 2, frameInterval: 200 },
};

const warriorStats = {
  walkSpeed: 1.2,
  healthPoints: 100,
  fallSpeed: 0.1,
  fallSpeedStep: 0.1,
  fallSpeedLimit: 5,

  attackDamage: 10,

  runSpeed: 2,

  jumpSpeedInitial: 5,
  jumpSpeed: 5,
  jumpSpeedStep: 0.1,
};

const warriorState = {
  isWalking: false,
  isHurt: false,
  direction: "right",
  attackDirection: "right",

  isAttacking: false,
  isAttackingAnimation: false,
  isAttackingRunningAnimation: false,

  isAnimating: false,

  isJumping: false,
  isJumpingAnimation: false,
  isJumpingInitial: false,

  isRunning: false,
  isFalling: false,
};

function warriorSetState() {
  setBaseState.call(this);
  setJumpState.call(this);
  setRunState.call(this);
  setRunAttackState.call(this);
}
function warriorSetEndSprite() {
  setEndRunAttackSprite.call(this);
  setEndJumpSprite.call(this);
}

function getWarriorSpriteName() {
  const { state } = this;
  if (state.isHurt) return "damage";

  if (state.isAttackingRunningAnimation) return "runAttack";
  if (state.isAttackingAnimation) return "attack";
  if (state.isJumpingAnimation) return "jump";

  if (state.isRunning) return "run";
  if (state.isWalking) return "walk";

  return "idle";
}

export const warrior = new Character({
  spriteImages: warriorImages,
  stats: warriorStats,
  state: warriorState,
  spriteState: new SpriteState(0.2),

  setState: warriorSetState,
  setSprite: setBaseSpriteCount,
  setEndSprite: warriorSetEndSprite,

  setMovePosition,

  getSpriteName: getWarriorSpriteName,
});

loadImages(warrior.spriteImages).then(() => warrior.setImages());
