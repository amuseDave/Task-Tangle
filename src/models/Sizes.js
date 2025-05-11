export function setCanvasSizeForScreen(canvas) {
  const dpr = window.devicePixelRatio || 1;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const ar = "--aspect-ratio";

  document.documentElement.style.setProperty(ar, `${width} / ${height}`);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
}
