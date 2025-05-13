export async function loadImages(imgArr) {
  for (let i = 0; i < imgArr.length; i++) {
    new Promise((res, rej) => {
      const image = new Image();
      image.src = imgArr[i].img;
      imgArr[i].img = image;
      image.onload = res;
      image.onerror = rej;
    });
  }
  await Promise.all(imgArr);
  return imgArr;
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
