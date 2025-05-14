import { game } from "../Game";

class GameObject {
  constructor(img, posX, posY, dynamicX, dynamicY) {
    this.img = img;

    this.posX = posX;
    this.posY = posY;
    this.dynamicX = dynamicX;
    this.dynamicY = dynamicY;
  }

  draw() {
    const { img, posX, posY } = this;
    const { height: canvasHeight } = game.canvasEl;
    const { width: imgWidth, height: imgHeight } = img;

    const cameraX = game.camera.x * this.dynamicX;
    const cameraY = game.camera.y * this.dynamicY;

    const dx = posX - cameraX;
    const dy = cameraY + canvasHeight - imgHeight - posY;

    game.ctx.drawImage(img, dx, dy);

    if (this.isInteractive) {
      this.setActive(img, dx, dy);
    }
  }
}

class GameObjectInteractive extends GameObject {
  constructor(img, activeImg, idleImg, posX, posY, dynamicX, dynamicY, interact) {
    super(img, posX, posY, dynamicX, dynamicY);

    this.idleImg = idleImg;
    this.activeImg = activeImg;
    this.isActive = false;
    this.isInteractive = true;

    this.interact = interact;
  }

  setActive(img, dx, dy) {
    // 30 can be dynamic for later
    if (
      game.player.posX >= this.posX - 30 &&
      game.player.posX <= this.posX + this.img.width + 30 &&
      game.player.posY <= this.posY + this.img.height + 30 &&
      game.player.posY >= this.posY - 30
    ) {
      game.ctx.drawImage(
        this.activeImg,
        dx + img.width / 2 - this.activeImg.width / 2,
        dy - img.height / 2
      );
      this.isActive = true;
    } else {
      this.isActive = false;
      game.ctx.drawImage(
        this.idleImg,
        dx + img.width / 2 - this.idleImg.width / 2,
        dy - img.height / 2
      );
    }
  }
}

export { GameObject, GameObjectInteractive };
