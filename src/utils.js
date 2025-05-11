export async function loadImages(imgObj) {
  for (const key in imgObj) {
    await new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imgObj[key].img;
      imgObj[key].img = image;
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  return;
}

export function setCanvasSizeForScreen(canvas) {
  const dpr = window.devicePixelRatio || 1;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const ar = "--aspect-ratio";

  document.documentElement.style.setProperty(ar, `${width} / ${height}`);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
}
