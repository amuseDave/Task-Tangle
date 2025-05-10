import warriorIdle from "../assets/warrior/Idle.png";
import warriorRun from "../assets/warrior/Run.png";
import warriorWalk from "../assets/warrior/Walk.png";
import warriorJump from "../assets/warrior/Jump.png";
import warriorAttack1 from "../assets/warrior/Attack_1.png";
import { Character } from "./Character.js";
import { loadImages } from "../utils.js";
import { Stats } from "./Stats.js";

const warriorImages = {
  idle: { img: warriorIdle, spriteCount: 6 },
  run: { img: warriorRun, spriteCount: 6 },
  walk: { img: warriorWalk, spriteCount: 8 },
  jump: { img: warriorJump, spriteCount: 5 },
  attack: { img: warriorAttack1, spriteCount: 4 },
};

const warriorStats = new Stats(1.4, 2, 5, 0.1, 0.1, 5, 100);
export const warrior = new Character(warriorImages, warriorStats);
loadImages(warrior.spriteImages).then(() => warrior.setImages());
