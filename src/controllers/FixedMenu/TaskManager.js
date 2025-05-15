import { game } from "../../models/Game";
import "../../styles/task-manager.css";

class TaskManager {
  constructor() {
    this.fixedMenuContainer = document.getElementById("fixed-menu-container");
    this.taskManagerContainer = document.getElementById("task-manager-container");
    this.fixedMenuDefault = document.getElementById("fixed-default-menu");
    this.inputTaskEl = document.getElementById("input-task");
    this.inputContFormEl = document.getElementById("input-cont");
    this.taskList = document.getElementById("task-list");
    this.errMsg = document.getElementById("error-message");

    this.tasks = JSON.parse(localStorage.getItem("task-tangle-tasks")) || [];

    this.registerEvents();
    this.initializeTasks();
  }

  initializeTasks() {
    if (this.tasks.length < 1) {
      this.tasks.push({ task: "Example-Task", isCompleted: false, id: "139887sxsj1" });
    }

    for (let i = 0; i < this.tasks.length; i++) this.generateTask(this.tasks[i]);
  }

  taskInteract() {
    this.fixedMenuContainer.classList.add("visible");
    this.taskManagerContainer.classList.add("visible");
    this.fixedMenuDefault.classList.remove("visible");
    game.isMenuOpen = true;

    setTimeout(() => {
      this.inputTaskEl.focus();
    }, 300);
  }
  addTask(e) {
    if (this.tasks.length > 5) {
      if (this.errMsg.style.display === "block") {
      } else {
        setTimeout(() => {
          this.errMsg.style.display = "none";
        }, 2000);
      }

      this.errMsg.style.display = "block";
      return;
    }

    const str = this.inputTaskEl.value.trim();
    if (str.length < 4 || str.length > 17) {
      this.inputTaskEl.focus();
      return;
    }

    const id = crypto.randomUUID();
    const task = { task: str, isCompleted: false, id };
    this.generateTask(task);

    this.tasks.push(task);
    this.saveLocalStorage();
    this.inputTaskEl.value = "";
  }

  generateTask(task) {
    const liEl = document.createElement("li");
    liEl.dataset.id = task.id;

    const pEl = document.createElement("p");
    pEl.textContent = task.task;

    const buttonEl = document.createElement("button");
    buttonEl.className = "toggle";
    const buttonEl2 = document.createElement("button");
    buttonEl2.className = "delete";
    const imgEl = document.createElement("img");
    imgEl.src = `./${task.isCompleted ? "x" : "check"}.png`;
    const imgEl2 = document.createElement("img");
    imgEl2.src = "./trash.png";

    buttonEl.appendChild(imgEl);
    buttonEl2.appendChild(imgEl2);

    const divButtonEl = document.createElement("div");
    divButtonEl.className = "buttons";

    divButtonEl.appendChild(buttonEl);
    divButtonEl.appendChild(buttonEl2);

    liEl.appendChild(pEl);
    liEl.appendChild(divButtonEl);

    this.taskList.appendChild(liEl);
  }

  deleteTask(btn) {
    const taskLi = btn.closest("li");
    const taskId = taskLi.dataset.id;
    const taskIdx = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks.splice(taskIdx, 1);
    this.saveLocalStorage();
    taskLi.remove();
  }

  updateTask(btn) {
    const img = btn.querySelector("img");
    const taskLi = btn.closest("li");
    const pEl = taskLi.querySelector("p");
    const taskId = taskLi.dataset.id;
    const task = this.tasks.find((task) => task.id === taskId);
    task.isCompleted = !task.isCompleted;

    pEl.style.textDecoration = task.isCompleted ? "line-through" : "";
    img.src = task.isCompleted ? "./x.png" : "./check.png";
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem("task-tangle-tasks", JSON.stringify(this.tasks));
  }

  handleValidation(e) {
    const str = e.target.value.trim();

    if (str.length === 0) {
      e.target.style.borderColor = "rgb(7, 7, 7)";
    } else if (str.length < 4 || str.length > 17) {
      e.target.style.borderColor = "rgb(96, 0, 0)";
    } else {
      e.target.style.borderColor = "rgb(0, 90, 3)";
    }
  }

  registerEvents() {
    this.inputContFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTask(e);
    });
    this.inputTaskEl.addEventListener("input", (e) => {
      this.handleValidation(e);
    });
    this.inputTaskEl.addEventListener("blur", (e) => {
      e.target.style.borderColor = "rgb(48, 48, 48)";
    });
    this.inputTaskEl.addEventListener("focus", (e) => {
      this.handleValidation(e);
    });

    this.taskManagerContainer.addEventListener("click", (e) => {
      const toggle = e.target.closest(".toggle");
      const remove = e.target.closest(".delete");

      if (toggle) {
        this.updateTask(toggle);
      } else if (remove) {
        this.deleteTask(remove);
      }
    });
  }
}

const taskManager = new TaskManager();
const taskInteract = taskManager.taskInteract.bind(taskManager);
export { taskInteract };
