import "./style.css";
import warriorIdle from "./assets/warrior/Idle.png";
import warriorRun from "./assets/warrior/Run.png";
import warriorWalk from "./assets/warrior/Walk.png";
import { loadImages } from "./utils";

const canvasEl = document.getElementById("canvas");
const ctx = canvasEl.getContext("2d");

// Set canvas size to 500x500
canvasEl.width = 300;
canvasEl.height = 300;

class Character {
  characterSprites = {};
  constructor(state = "iddle") {
    this.state = state;
  }

  update(deltaTime) {
    // Update frame for breathing animation
    this.frameTimer += deltaTime;
    if (this.frameTimer >= this.frameDelay) {
      this.frameIndex = (this.frameIndex + 1) % this.frameCount; // Cycle through frames
      this.frameTimer = 0; // Reset timer
    }
  }

  draw() {
    const sprite = this.characterSprites[this.state];
    if (!sprite.img.complete || sprite.img.naturalWidth === 0) {
      console.warn(`Image for state ${this.state} not ready`);
      return;
    }

    // Calculate position to center the sprite (adjust as needed)
    const posX = (canvasEl.width - this.frameWidth) / 2; // Center horizontally
    const posY = canvasEl.height - sprite.img.height; // Place at bottom (adjust if needed)

    // Draw the current frame of the idle sprite
    ctx.drawImage(
      sprite.img,
      this.frameIndex * this.frameWidth, // Source x (current frame)
      0, // Source y
      this.frameWidth, // Source width (one frame)
      sprite.img.height, // Source height
      posX, // Destination x
      posY, // Destination y
      this.frameWidth, // Destination width
      sprite.img.height // Destination height
    );
  }

  setCharacter(spriteImages) {
    for (const key in spriteImages) {
      this.characterSprites[key] = spriteImages[key];
    }
  }
}

const warriorImages = {
  iddle: { img: warriorIdle, spriteCount: 6 },
  run: { img: warriorRun, spriteCount: 8 },
  walk: { img: warriorWalk, spriteCount: 6 },
};
const warrior = new Character();
loadImages(warriorImages).then(() => {
  warrior.setCharacter(warriorImages);
});

let lastTime = 0;

function animateGame(timestamp) {
  // Calculate deltaTime for smooth animation
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  warrior.update(deltaTime); // Update frame for breathing
  warrior.draw();
  requestAnimationFrame(animateGame);
}
