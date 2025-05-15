import { game } from "../models/Game";

const fixedMenuContainer = document.getElementById("fixed-menu-container");
const fixedMenuDefault = document.getElementById("fixed-default-menu");
const taskManagerContainer = document.getElementById("task-manager-container");

fixedMenuContainer.style.display = "flex";

export class PlayerController {
  constructor(character) {
    this.state = {
      aPressed: false,
      dPressed: false,
      arrowrightPressed: false,
      arrowleftPressed: false,

      wPressed: false,
      " Pressed": false,
      arrowupPressed: false,

      shiftPressed: false,

      escapePressed: false,
      ePressed: false,
    };
    this.character = character;
  }

  handleKeyDown(e) {
    if (e.repeat) return;
    const key = e.key.toLowerCase();

    if (this.state[`${key}Pressed`] === undefined) return;
    this.state[`${key}Pressed`] = true;

    const left = key === "a" || key === "arrowleft";
    const right = key === "d" || key === "arrowright";

    if (left || right) {
      this.character.state.isWalking = true;
      this.character.state.direction = right ? "right" : "left";
      if (this.state.shiftPressed) this.character.state.isRunning = true;
    } else if (key === "w" || key === " " || key === "arrowup") {
      if (!this.character.state.isJumping && !this.character.state.isFalling) {
        this.character.state.isJumping = true;
      }
    } else if (key === "shift") {
      if (this.character.state.isWalking) this.character.state.isRunning = true;
    }
    // Interact with objects that are active
    else if (key === "e") {
      for (let i = 0; i < game.interactiveObjects.length; i++) {
        const object = game.interactiveObjects[i];
        if (object.isActive) {
          object.interact();
        }
      }
    }
    // Close menu
    else if (key === "escape") {
      if (fixedMenuContainer.classList.contains("visible")) {
        this.handleClouseMenu();
      } else {
        this.handleOpenMenu();
      }
    }
  }
  handleClouseMenu() {
    fixedMenuContainer.classList.remove("visible");
    fixedMenuDefault.classList.remove("visible");
    taskManagerContainer.classList.remove("visible");
    game.isMenuOpen = false;
  }
  handleOpenMenu() {
    fixedMenuDefault.classList.add("visible");
    fixedMenuContainer.classList.add("visible");
    game.isMenuOpen = true;
  }
  handleMenuClick(e) {
    const closeBtn = e.target.closest(".close-btn-menu");
    // const fixedMenuContainerBG = e.target.closest(".fixed-menu");
    if (closeBtn) this.handleClouseMenu();
  }

  handleKeyUp(e) {
    const key = e.key.toLowerCase();

    if (this.state[`${key}Pressed`] === undefined) return;
    this.state[`${key}Pressed`] = false;

    const left = key === "a" || key === "arrowleft";
    const right = key === "d" || key === "arrowright";

    // Hande walking state with switches if other key is still down
    if (left || right) {
      if (
        this.state.aPressed ||
        this.state.dPressed ||
        this.state.arrowleftPressed ||
        this.state.arrowrightPressed
      ) {
        this.character.state.direction = left ? "right" : "left";
      } else {
        this.character.state.isWalking = false;
        this.character.state.isRunning = false;
      }
    } else if (key === "shift") {
      this.character.state.isRunning = false;
    }
  }

  handleMouseDown(e) {
    if (game.isMenuOpen) return;
    if (e.button === 0 && !this.character.state.animationLock) {
      this.character.state.isAttack = true;
    } else if (e.button !== 0) {
      this.character.state.isHurt = true;
    }
  }
  handleMouseUp(e) {}

  setEvents() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
    window.addEventListener("mouseup", this.handleMouseUp.bind(this));

    window.addEventListener("blur", this.handleBlur.bind(this));

    fixedMenuContainer.addEventListener("click", this.handleMenuClick.bind(this));
  }

  handleBlur() {
    this.character.state.isWalking = false;
    this.character.state.isRunning = false;
    this.state.shiftPressed = false;
  }
}
