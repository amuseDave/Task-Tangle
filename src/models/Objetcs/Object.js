import { game } from "../Game";

class GameObject {
  constructor(img, relativeX, relativeY, dynamicX, width = null, height = null) {
    this.img = img;
    this.relativeX = relativeX;
    this.relativeY = relativeY;
    this.dynamicX = dynamicX;

    this.width = width;
    this.height = height;
  }

  draw() {
    console.log(this.relativeX);
    const { width, height } = game.canvasEl;
    const { img, relativeX, relativeY } = this;

    const dx = relativeX - game.camera.x * this.dynamicX;

    if (this.width) {
      game.ctx.drawImage(
        img,
        dx,
        height * relativeY - img.height / 2,
        this.width,
        this.height
      );
    } else {
      game.ctx.drawImage(img, dx, 0);
    }
  }
}

export { GameObject };
