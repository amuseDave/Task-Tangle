import warriorIdle from "../assets/warrior/Idle.png";
import warriorRun from "../assets/warrior/Run.png";
import warriorWalk from "../assets/warrior/Walk.png";
import warriorJump from "../assets/warrior/Jump.png";
import warriorAttack1 from "../assets/warrior/Attack_1.png";
import warriorAttackRun1 from "../assets/warrior/Run+Attack.png";
import { Character } from "./Character.js";
import { loadImages } from "../utils.js";
import { Stats } from "./Stats.js";

const warriorImages = {
  idle: { img: warriorIdle, spriteCount: 6, frameInterval: 120 },
  walk: { img: warriorWalk, spriteCount: 8, frameInterval: 100 },
  run: { img: warriorRun, spriteCount: 6, frameInterval: 70 },
  jump: { img: warriorJump, spriteCount: 5, frameInterval: 100 },
  attack: { img: warriorAttack1, spriteCount: 4, frameInterval: 80 },
  runAttack: { img: warriorAttackRun1, spriteCount: 4, frameInterval: 70 },
};

const warriorStats = new Stats(1.4, 2, 5, 0.1, 0.1, 5, 100);
export const warrior = new Character(warriorImages, warriorStats);
loadImages(warrior.spriteImages).then(() => warrior.setImages());
