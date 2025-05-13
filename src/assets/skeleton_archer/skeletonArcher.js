import Idle from "./Idle.png";
import Walk from "./Walk.png";
import Attack from "./Attack_1.png";
import Arrow from "./Arrow.png";
import Shoot from "./Shot_1.png";
import Shoot2 from "./Shot_1.png";

const skeletonArcherImages = {
  idle: { img: Idle, frameCount: 7, frameInterval: 120, frame: 0 },
  walk: { img: Walk, frameCount: 8, frameInterval: 100, frame: 0 },
  attack: { img: Attack, frameCount: 5, frameInterval: 90, frame: 0 },
  shoot: { img: Shoot, frameCount: 15, frameInterval: 100, frame: 0 },
  shoot2: { img: Shoot2, frameCount: 15, frameInterval: 100, frame: 0 },
  arrow: { img: Arrow },
};
export { skeletonArcherImages };
