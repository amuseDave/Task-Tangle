import { game } from "../../models/Game";
import "../../styles/task-manager.css";

const fixedMenuContainer = document.getElementById("fixed-menu-container");
const taskManagerContainer = document.getElementById("task-manager-container");
const fixedMenuDefault = document.getElementById("fixed-default-menu");
const inputTaskEl = document.getElementById("input-task");
const inputContFormEl = document.getElementById("input-cont");

const tasks = JSON.parse(localStorage.getItem("task-tangle-tasks")) || [];

function taskInteract() {
  fixedMenuContainer.classList.add("visible");
  taskManagerContainer.classList.add("visible");
  fixedMenuDefault.classList.remove("visible");
  game.isMenuOpen = true;
}

function updateTask() {}

taskManagerContainer.addEventListener("transitionend", () => {
  inputTaskEl.focus();
});

inputContFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  // Handle submitting tasks and updating them
});
inputTaskEl.addEventListener("input", () => {
  // Handle input validation
});

export { taskInteract };
