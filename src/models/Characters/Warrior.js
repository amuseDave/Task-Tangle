import warriorIdle from "../../assets/warrior/Idle.png";
import warriorRun from "../../assets/warrior/Run.png";
import warriorWalk from "../../assets/warrior/Walk.png";
import warriorJump from "../../assets/warrior/Jump.png";
import warriorAttack1 from "../../assets/warrior/Attack_1.png";
import warriorAttackRun1 from "../../assets/warrior/Run+Attack.png";
import { Character } from "./Character.js";
import { loadImages } from "../../utils.js";
import {
  handleBaseState,
  handleRunAttackState,
  handleRunState,
} from "../State/StateMethods.js";
import {
  handleBaseSpriteCount,
  handleJumpSprite,
  handleRunAttackSprite,
} from "../SpriteState/SpriteMethods";
import { handleJumpState } from "../State/HandleJumpState.js";

const warriorImages = {
  idle: { img: warriorIdle, spriteCount: 6, frameInterval: 120 },
  walk: { img: warriorWalk, spriteCount: 8, frameInterval: 100 },
  run: { img: warriorRun, spriteCount: 6, frameInterval: 70 },
  jump: { img: warriorJump, spriteCount: 5, frameInterval: 100 },
  attack: { img: warriorAttack1, spriteCount: 4, frameInterval: 80 },
  runAttack: { img: warriorAttackRun1, spriteCount: 4, frameInterval: 70 },
};

const warriorStats = {
  walkSpeed: 1.4,
  spriteEmptySpace: 0.2,
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

const warriorSpriteState = {
  spriteCount: null,
  frameInterval: null,
  currentSprite: 0,
  isMaxSprite: false,
  name: "",

  isAttacking: false,
  isRunningAttacking: false,
};

function warriorSetState() {
  handleBaseState.call(this);
  handleJumpState.call(this);
  handleRunState.call(this);
  handleRunAttackState.call(this);
}

function warriorGetSpriteName() {
  const { state } = this;
  // # Return state based on the order
  if (state.isHurt) return "damage";
  // Animations independent from the active changing state
  // It needs to forwards only once
  if (state.isAttackingRunningAnimation) return "runAttack";
  if (state.isAttackingAnimation) return "attack";
  if (state.isJumpingAnimation) return "jump";
  //
  if (state.isRunning) return "run";
  if (state.isWalking) return "walk";
  return "idle";
}

export const warrior = new Character({
  spriteImages: warriorImages,
  stats: warriorStats,
  state: warriorState,
  spriteState: warriorSpriteState,
  setState: warriorSetState,
  handleMinSprite: handleRunAttackSprite,
  handleMaxSprite: handleJumpSprite,
  setSpriteCount: handleBaseSpriteCount,
  getSpriteName: warriorGetSpriteName,
});

loadImages(warrior.spriteImages).then(() => warrior.setImages());
