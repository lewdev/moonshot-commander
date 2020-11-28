
class Unit {
  constructor(arg) {
    this.pos = {x: arg.pos.x, y: arg.pos.y};
    this.xSpeed = arg.xSpeed || 0;
    this.ySpeed = arg.ySpeed || 0;
    this.w = arg.w;
    this.h = arg.h;
    this.type = arg.type;
    this.color = arg.color || Colors.LIGHTRED;
    this.friendly = arg.type === 'friend';
    this.damage = this.friendly ? BULLET_DAMAGE.player : BULLET_DAMAGE.enemy;
    this.render = arg.render || false;
    // console.log(`x: ${arg.pos.x}, y: ${arg.pos.y}, `);
    // console.log(arg.pos.x);
    console.log(this.render);
  }
  render() {
    console.log("render");
    if (this.render) {
      this.render();}
    else Draw.roundedRectUnit({
      x: this.pos.x, y: this.pos.y, w: this.w, h: this.h, unitSize: 1, scale: 1,
      color: color || this.color, r: 2
    });
  }
}