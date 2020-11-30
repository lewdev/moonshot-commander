
const Img = (() => {
  const init = () => {
    Object.keys(IMG_MAP).forEach(imgName => {
      IMG_MAP[imgName].image = new Image();
      IMG_MAP[imgName].image.src = IMG_MAP[imgName].src;
    });
  }
  const draw = (pos, imgName, row, col, tileSize = 64, zoom = 1) => { //image is drawn centered
    const img = IMG_MAP[imgName];
    if (!img) return;
    const offsetX = tileSize * col;
    const offsetY = tileSize * row;
    ctx.drawImage(
      img.image, offsetX, offsetY, tileSize, tileSize
      , pos.x - (tileSize * zoom / 2)
      , pos.y - (tileSize * zoom / 2)
      , tileSize * zoom
      , tileSize * zoom
    );
  };
  return {
    init, draw, 
  };
})();
