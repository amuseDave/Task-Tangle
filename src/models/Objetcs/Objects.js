import moonImg from "../../assets/game_objects/moon.png";
import nightBg from "../../assets/game_objects/nightBg.png";
import barrel from "../../assets/game_objects/barrel.png";
import { loadImages } from "../../utils";
import { game } from "../Game";
import { GameObject } from "./Object";

const { canvasEl } = game;

loadImages([{ img: barrel }]).then((imgArr) => {
  const img = imgArr[0].img;
  const barrel = new GameObject(img, 660, 1, 1, 50, 60);
  game.addObject(barrel);
});

loadImages([{ img: moonImg }]).then((imgArr) => {
  const img = imgArr[0].img;
  const moonObject = new GameObject(img, 200, 0.3, 0.1);
  game.addObject(moonObject);
});

loadImages([{ img: nightBg }]).then((imgArr) => {
  const img = imgArr[0].img;
  const posX = canvasEl.width / 2 - img.width / 2;
  const backgroundObject = new GameObject(img, posX, 0, 0);
  game.addObject(backgroundObject);
});
