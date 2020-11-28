/**
 * This block represents a block that will be compared against game pieces.
 * If this hits a piece, it will cause damage on enemies.
 * @param text
 * @param options
 * @constructor
 */
function Button(text, options) {
  this.text = text;
  this.x = options.x;
  this.y = options.y;
  this.w = options.w;
  this.h = options.h;
  this.font = options.font;
  this.value = options.value; //value to hold
  this.fontSize = options.fontSize;
  this.fontColor = options.fontColor;
  this.color = options.color;
  this.mode = options.mode;
  this.hidden = options.hidden || false;
  this.rounded = options.rounded || "both";
  this.unitSize = options.unitSize;
  this.position = options.position;
  this.onclick = options.onclick;
}