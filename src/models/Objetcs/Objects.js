import moonImg from "../../assets/game_objects/moon.png";
import { game } from "../Game";
import { GameObject } from "./Object";

const { canvasEl } = game;
const moonObject = new GameObject(moonImg, 200, 200, true);

export { moonObject };
