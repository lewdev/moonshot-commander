const Draw = (function() {
  function roundedRectUnit(options) {
    roundedRect({
      x: options.x
      , y: options.y
      , radius: options.r * options.r * options.r
      , w: options.w * options.unitSize * options.scale
      , h: options.h * options.unitSize * options.scale
      , color: options.color
      , rounded: options.rounded
      , opacity: options.opacity
    });
  }
  //utilities
  function roundedRect(options) {
    //draw from the center
    let x = options.x - (options.w / 2)
    let y = options.y - (options.h / 2)
    let w = options.w;
    let h = options.h;
    const rounded = options.rounded ? options.rounded : ""; 
    ctx.strokeStyle = options.color;
    ctx.fillStyle = options.color;
    ctx.lineJoin = "round";
    ctx.lineWidth = options.radius;
    if (rounded) {
      ctx.strokeRect(
        x + (options.radius * .5),
        y + (options.radius * .5),
        options.w - options.radius,
        options.h - options.radius
      );
    }
    if (rounded === "top") {
      y = y + (options.radius * .5);
      h = h - options.radius * .5;
    }
    else if (rounded === "bottom") {
      h = h - options.radius;
    }
    else if (rounded === "both") {
      y = y + (options.radius * .5);
      h = h - options.radius;
    }
    ctx.globalAlpha = options.opacity || 1;
    ctx.fillRect(x, y, w, h);
    ctx.stroke();
    ctx.fill();
  }
  function circle(options) {
    ctx.beginPath();
    const { x, y, radius, color, line } = options;
    const startAngle = 0, endAngle = 2;
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, startAngle, endAngle * Math.PI);
    ctx.fill();
    if (line) {
      ctx.lineWidth = line.width || 1;
      ctx.strokeStyle = line.color || 'black';
      ctx.stroke();
    }
  }
  function text(text, options) {
    const align = options.align || "center";
    const fontStyle = options.fontStyle || "Arial";
    const opacity = options.opacity || 1;
    let x = options.x;
    let y = options.y;
    ctx.font = options.fontSize + "px " + fontStyle;
    ctx.fillStyle = options.color;
    ctx.globalAlpha = opacity;
    const measure = ctx.measureText(text);
    if (align === "center") {
      x = x - measure.width / 2;
    }
    else if (align === "right") {
      x = x - measure.width;
    }
    ctx.fillText(text, x, y);
    ctx.globalAlpha = 1;
    return measure;
  }
  function clear(bgColor) {
    ctx.fillStyle = bgColor || "black";
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillRect(0, 0, c.width, c.height);
  }
  function getCenterX() { return c.width / 2; }
  function getCenterY() { return c.height / 2; }
  return {
    text: text
    , clear: clear
    , circle: circle
    , roundedRectUnit: roundedRectUnit
    , getCenterX: getCenterX
    , getCenterY: getCenterY
  };
})();