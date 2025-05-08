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
