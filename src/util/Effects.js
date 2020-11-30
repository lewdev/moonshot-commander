

const EXPLOSION_LENGTH = 200;//ms
const EXPLOSION2_LENGTH = 100;//ms
let eColor = Colors.WHITE, eX, eY, eSize, variance, percent;
const Effects = {
  addExplosion: (x, y, size = 100, color = Colors.LIGHTRED, length = EXPLOSION_LENGTH) => fx.push({ type: 'explosion1', x, y, size, length, time: t, color }),
  addExplosion2: (x, y, size = 100, color = Colors.WHITE, length = EXPLOSION2_LENGTH) => fx.push({ type: 'explosion2', x, y, size, length, time: t, color, w: 50 }),
  handle: () => {
    if (fx && fx.length > 0) {
      fx = fx.filter(e => (t - e.time) < e.length);
      fx.forEach(e => {
        if (e.type === 'explosion1') Effects.explosion1(e);
        else if (e.type === 'explosion2') Effects.explosion2(e);
      });
      ctx.beginPath();
    }
  },
  explosion1: e => {
    variance = e.size * .5;
    eX = e.x + Rand.range(-variance, variance);
    eY = e.y + Rand.range(-variance, variance);
    eColor = Rand.bool() ? e.color : Colors.WHITE;
    eSize = e.size + Rand.range(-variance, variance);
    Draw.circle({x: eX, y: eY, radius: eSize, color: eColor });
    if (percent <= 1) Draw.circle({x: eX, y: eY, radius: eSize, color: eColor });
    else e.remove = 1;
  },
  explosion2: e => {
    eColor = Colors.WHITE;
    percent = (t - e.time) / e.length;
    eSize = percent * e.w;
    opacity = percent - 1;
    if (percent >= 0) Draw.circle({x: e.x, y: e.y, radius: eSize, color: eColor, opacity: percent - 1 });
    else e.remove = 1;
  },
};