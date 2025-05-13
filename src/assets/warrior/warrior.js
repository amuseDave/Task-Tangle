import Idle from "./Idle.png";
import Run from "./Run.png";
import Walk from "./Walk.png";
import Attack from "./Attack_1.png";
import AttackRun from "./Run+Attack.png";
import Hurt from "./Hurt.png";
import Fall from "./fall.png";

const warriorImages = {
  imgs: [
    { name: "idle", img: Idle },
    { name: "walk", img: Walk },
    { name: "run", img: Run },
    { name: "attack", img: Attack },
    { name: "runAttack", img: AttackRun },
    { name: "hurt", img: Hurt },
    { name: "fall", img: Fall },
  ],
  idle: { img: Idle, frameCount: 6, frameInterval: 140, frame: 0 },
  walk: { img: Walk, frameCount: 8, frameInterval: 110, frame: 0 },
  run: { img: Run, frameCount: 6, frameInterval: 110, frame: 0 },
  attack: { img: Attack, frameCount: 4, frameInterval: 70, frame: 0 },
  runAttack: { img: AttackRun, frameCount: 4, frameInterval: 70, frame: 0 },
  hurt: { img: Hurt, frameCount: 2, frameInterval: 80, frame: 0 },
  fall: { img: Fall, frameCount: 2, frameInterval: 100, frame: 0 },
};

export { warriorImages };
