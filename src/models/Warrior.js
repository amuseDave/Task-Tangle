import warriorIdle from "../assets/warrior/Idle.png";
import warriorRun from "../assets/warrior/Run.png";
import warriorWalk from "../assets/warrior/Walk.png";
import { Character } from "./Character.js";
import { loadImages } from "../utils.js";

const warriorImages = {
  idle: { img: warriorIdle, spriteCount: 6 },
  run: { img: warriorRun, spriteCount: 6 },
  walk: { img: warriorWalk, spriteCount: 8 },
};

export const warrior = new Character(warriorImages);
loadImages(warrior.spriteImages).then(warrior.setImages.bind(warrior));
