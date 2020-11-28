

const EXPLOSION_LENGTH = 1000;//ms
let eColor = Colors.WHITE, eX, eY, eSize, variance;
const Effects = {
  addExplosion: (x, y, size = 100, color = Colors.LIGHTRED, length = 200) => fx.push({ type: 'explosion', x, y, size, length, time: t, color }),
  handle: () => {
    if (fx && fx.length > 0) {
      fx = fx.filter(e => (t - e.time) < e.length);
      fx.forEach(e => {
        if (e.type === 'explosion') Effects.explosion(e);
      });
      ctx.beginPath();
    }
  },
  explosion: e => {
    // const time = t - e.time;
    //const percent = time / e.length; * percent
    variance = e.size * .5;
    eX = e.x + Rand.range(-variance, variance);
    eY = e.y + Rand.range(-variance, variance);
    eColor = Rand.bool() ? e.color : Colors.WHITE;
    eSize = e.size + Rand.range(-variance, variance);
    Draw.circle({x: eX, y: eY, radius: eSize, color: eColor });
  }
};