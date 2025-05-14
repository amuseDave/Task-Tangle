import moonImg from "../../assets/game_objects/moon.png";
import trainingGround from "../../assets/game_objects/trainingGround.png";

import taskBoard from "../../assets/game_objects/taskBoard.png";
import info from "../../assets/game_objects/info.png";
import toolTipE from "../../assets/game_objects/toolTipE2.png";

import { loadImages } from "../../utils";
import { game } from "../Game";
import { GameObject, GameObjectInteractive } from "./Object";
import { taskInteract } from "../../controllers/FixedMenu/TaskManager";

const { canvasEl } = game;

loadImages([{ img: taskBoard }, { img: info }, { img: toolTipE }]).then((imgArr) => {
  const [tB, info, TTE] = imgArr.map((i) => i.img);
  const taskBoard = new GameObjectInteractive(tB, TTE, info, 80, 0, 1, 1, taskInteract);
  game.addObject(taskBoard);

  // Since above objects are dependant to be z indexed bellow
  // We set images of training ground only when above are loaded
  loadImages([{ img: trainingGround }]).then((imgArr) => {
    const img = imgArr[0].img;
    const posX = canvasEl.width / 2 - img.width / 2;
    const trainingGround = new GameObject(img, 0, 0, 1, 1);
    game.addObject(trainingGround);
  });
});

loadImages([{ img: moonImg }]).then((imgArr) => {
  const img = imgArr[0].img;
  const moonObject = new GameObject(img, 200, 600, 0.05, 0);
  game.addObject(moonObject);
});
