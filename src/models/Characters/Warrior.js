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
  handleBaseState,
  handleRunAttackState,
  handleRunState,
  handleJumpState,
} from "../../controllers/CharacterMethods/State/StateMethods.js";

import {
  handleBaseSpriteCount,
  handleJumpSprite,
  handleRunAttackSprite,
} from "../../controllers/CharacterMethods/SpriteState/SpriteMethods";

import { setMovePosition } from "../../controllers/CharacterMethods/SetMovePosition.js";
import { SpriteState } from "../SpriteState.js";

const warriorImages = {
  idle: { img: warriorIdle, spriteCount: 6, frameInterval: 120 },
  walk: { img: warriorWalk, spriteCount: 8, frameInterval: 100 },
  run: { img: warriorRun, spriteCount: 6, frameInterval: 70 },
  jump: { img: warriorJump, spriteCount: 5, frameInterval: 100 },
  attack: { img: warriorAttack1, spriteCount: 4, frameInterval: 80 },
  runAttack: { img: warriorAttackRun1, spriteCount: 4, frameInterval: 70 },
  hurt: { img: warriorHurt, spriteCount: 2, frameInterval: 120 },
};

const warriorStats = {
  walkSpeed: 1.4,
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

  isAttacking: false,
  isAttackingInitial: false,
  isAttackingAnimation: false,
  isAttackingRunningAnimation: false,

  isJumping: false,
  isJumpingAnimation: false,
  isJumpingInitial: false,

  isRunning: false,
  isFalling: false,
};

function warriorSetState() {
  handleBaseState.call(this);
  handleJumpState.call(this);
  handleRunState.call(this);
  handleRunAttackState.call(this);
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
  setSprite: handleBaseSpriteCount,

  setFinishLoopSprite: handleRunAttackSprite,
  setFinishForwardSprite: handleJumpSprite,

  setMovePosition,

  getSpriteName: getWarriorSpriteName,
});

loadImages(warrior.spriteImages).then(() => warrior.setImages());
