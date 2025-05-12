import skeletonIdle from "../assets/skeleton_archer/Idle.png";
import skeletonWalk from "../assets/skeleton_archer/Walk.png";
import skeletonAttack from "../assets/skeleton_archer/Attack_1.png";
import skeletonArrow from "../assets/skeleton_archer/Arrow.png";
import skeletonShot from "../assets/skeleton_archer/Shot_1.png";
import skeletonShot2 from "../assets/skeleton_archer/Shot_1.png";

const skeletonArcherImages = {
  idle: { img: skeletonIdle, spriteCount: 6, frameInterval: 120 },
  walk: { img: skeletonWalk, spriteCount: 8, frameInterval: 100 },
  attack: { img: skeletonAttack, spriteCount: 6, frameInterval: 70 },
  shot: { img: skeletonShot, spriteCount: 5, frameInterval: 100 },
  shot2: { img: skeletonShot2, spriteCount: 4, frameInterval: 80 },
  arrow: { img: skeletonArrow, spriteCount: null, frameInterval: null },
};
