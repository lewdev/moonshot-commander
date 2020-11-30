const BGCOLOR = Colors.BLACK;
const MODE = { START: 1, LEVEL_SELECT: 2, GAME: 3, END: 4 };
const IMG_MAP = {
  "moonshot-assets": { src: 'assets/moonshot-assets.png' },
  "start-screen": { src: 'assets/start-screen.png' },
  "game-complete-screen": { src: 'assets/game-complete-screen.png' },
};
const MUSIC_VOLUME = .5;
const BULLET_DAMAGE = { enemy: 10, player: 40, bot: 30 };
const ATTACK_SPEED = {
  START: 300,
  MID: 200,
  FASTEST: 100,
  DECREASE_RATE: 50,
};