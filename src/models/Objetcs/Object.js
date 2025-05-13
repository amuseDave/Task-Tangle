import { game } from "../Game";

class GameObject {
  constructor(img, posX, posY, isStatic) {
    this.posX = posX;
    this.posY = posY;
    this.isStatic = isStatic;
    this.img = img;

    this.loadedImage = false;
    this.loadImage();
  }

  draw() {
    const { width, height } = game.canvasEl;
    const { img, posX, posY } = this;
    const dx = this.isStatic ? posX : posX - game.camera.x;
    game.ctx.drawImage(img, dx, posY);
  }

  loadImage() {
    const image = new Image();
    image.src = this.img;
    image.onload = () => {
      this.loadedImage = true;
      this.img = image;

      this.posX = game.canvasEl.width / 2;
      this.posY = image.height / 4;
    };
  }
}

export { GameObject };
