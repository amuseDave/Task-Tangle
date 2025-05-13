import { game } from "../../models/Game";

function setFrames() {
  const frameName = this.getActiveFrameName();

  const { frameImages, frameState } = this;
  const frameImg = frameImages[frameName];

  if (frameName !== frameState.name) {
    frameState.name = frameName;
    frameState.currentTime = game.currentTime;
  } else if (frameState.currentTime + frameImg.frameInterval <= game.currentTime) {
    frameImg.frame += 1;

    if (frameImg.frame === frameImg.frameCount) {
      if (this.state.isHurt) {
        this.state.isHurt = false;
      } else if (this.state.animationLock) {
        this.state.isAttack = false;
        this.state.animationLock = null;
      }
      frameImg.frame = 0;
    }
    frameState.currentTime = game.currentTime;
  }
}

export { setFrames };
