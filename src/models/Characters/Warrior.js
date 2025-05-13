import {
  Attack1,
  Hurt,
  Idle,
  AttackRun,
  Jump,
  Run,
  Walk,
  Fall,
} from "../../assets/warrior/warrior.js";

import {
  setState,
  setRunAttackState,
  setJumpState,
  setMoveState,
} from "../../controllers/CharacterMethods/State/StateMethods.js";
import { setFrames } from "../../controllers/CharacterMethods/setFrames.js";

import { Character } from "./Character.js";
import { loadImages } from "../../utils.js";
import { Stats } from "../Stats.js";

const warriorImages = {
  idle: { img: Idle, frameCount: 6, frameInterval: 140, frame: 0 },
  walk: { img: Walk, frameCount: 8, frameInterval: 110, frame: 0 },
  run: { img: Run, frameCount: 6, frameInterval: 110, frame: 0 },
  attack: { img: Attack1, frameCount: 4, frameInterval: 70, frame: 0 },
  runAttack: { img: AttackRun, frameCount: 4, frameInterval: 70, frame: 0 },
  hurt: { img: Hurt, frameCount: 2, frameInterval: 80, frame: 0 },
  fall: { img: Fall, frameCount: 2, frameInterval: 100, frame: 0 },
};

const warriorStats = new Stats(0.2, 1.2, 100, 0.1, 0.1, 5, 10, 2, 5, 5, 0.1, 0.2);

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

export const warrior = new Character({
  frameImages: warriorImages,
  stats: warriorStats,

  setState: warriorSetState,
  setFrames: setFrames,

  getActiveFrameName: getWarriorActiveFrameName,
});

loadImages(warrior.frameImages).then(() => warrior.setImages());
