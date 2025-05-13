import { game } from "../Game.js";
import { Character } from "./Character.js";
import { Stats } from "./Stats.js";
import { loadImages } from "../../utils.js";

import { setFrames } from "../../controllers/CharacterMethods/setFrames.js";
import { warrior } from "./Warrior.js";
import { skeletonArcher } from "./SkeletonArcher.js";

loadImages(warrior.frameImages.imgs).then((imgArr) => {
  for (let i = 0; i < imgArr.length; i++) {
    warrior.frameImages[imgArr[i].name].img = imgArr[i].img;
  }
  warrior.frameImages.imgs = undefined;

  const character = new Character(warrior);
  game.addCharacter({ character, x: 30, y: 0, type: "player" });
});

loadImages(skeletonArcher.frameImages.imgs).then((imgArr) => {
  for (let i = 0; i < imgArr.length; i++) {
    skeletonArcher.frameImages[imgArr[i].name].img = imgArr[i].img;
  }
  skeletonArcher.frameImages.imgs = undefined;

  const character = new Character(skeletonArcher);
  game.addCharacter({ character, x: 1000, y: 0, type: "enemy" });
});
