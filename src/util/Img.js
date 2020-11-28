
const Img = (() => {
  const init = () => {
    Object.keys(IMG_MAP).forEach(imgName => {
      IMG_MAP[imgName].image = new Image();
      IMG_MAP[imgName].image.src = IMG_MAP[imgName].src;
    });
  }
  const draw = (pos, imgName, row, col, zoom = 1) => { //image is drawn centered
    const img = IMG_MAP[imgName];
    if (!img) return;
    const offsetX = img.w * col;
    const offsetY = img.h * row;
    ctx.drawImage(
      img.image, offsetX, offsetY, img.w, img.h
      , pos.x - (img.w * zoom / 2)
      , pos.y - (img.h * zoom / 2)
      , img.w * zoom
      , img.h * zoom
    );
  };
  return {
    init, draw, 
  };
})();
