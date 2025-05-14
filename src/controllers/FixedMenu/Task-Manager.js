import "../../styles/task-manager.css";

const fixedMenuContainer = document.getElementById("fixed-menu-container");
const taskManagerContainer = document.getElementById("task-manager-container");

const tasks = JSON.parse(localStorage.getItem("task-tangle-tasks")) || [];

function taskInteract() {
  fixedMenuContainer.classList.add("visible");
  taskManagerContainer.classList.add("visible");
}

export { taskInteract };
