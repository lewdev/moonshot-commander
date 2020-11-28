const BGCOLOR = Colors.BLACK;
const MODE = { START: 1, LEVEL_SELECT: 2, GAME: 3, END: 4 };
const IMG_MAP = {
  "moonshot-assets": { src: 'img/moonshot-assets.png', w: 64, h: 64, rows: 1, cols: 3, },
};
const BULLET_DAMAGE = { enemy: 10, player: 40 };
const ATTACK_SPEED = {
  START: 300,
  FASTEST: 100,
  DECREASE_RATE: 50,
};