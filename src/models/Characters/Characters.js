import { game } from "../Game.js";
import { Character } from "./Character.js";
import { Stats } from "./Stats.js";
import { loadImages } from "../../utils.js";

import { setFrames } from "../../controllers/CharacterMethods/setFrames.js";
import { warrior } from "./Warrior.js";
import { skeletonArcher } from "./SkeletonArcher.js";

loadImages(warrior.frameImages).then(() => {
  const character = new Character(warrior);
  game.addCharacter({ character, x: 30, y: 0, type: "player" });
});
loadImages(skeletonArcher.frameImages).then(() => {
  const character = new Character(skeletonArcher);
  game.addCharacter({ character, x: 1000, y: 0, type: "enemy" });
});
