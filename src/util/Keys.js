let touchStartDiff = { x: 0, y: 0 };
let touched = 0;
var Keys = {
  // key codes
  SPACE : 32 //jump
  , N1 : 97 //attack
  , N2 : 98 //jump
  , N3 : 99 //defend

  , UP : 'ArrowUp'
  , DOWN : 'ArrowDown'
  , LEFT : 'ArrowLeft'
  , RIGHT : 'ArrowRight'

  , ENTER : 'Enter'
  , init: () => {
    window.addEventListener('keydown', function (e) {
      if (e.key !== undefined) keys[e.key] = e.type === 'keydown'; // Handle the event with KeyboardEvent.key and set handled true.
      // if (e.defaultPrevented) return; // Should do nothing if the default action has been cancelled
      // let handled = false;
      // if (handled) e.preventDefault();// Suppress "double action" if event handled
    });
    window.addEventListener('keyup', e => keys[e.key] = (e.type == "keydown"));
    window.addEventListener('touchend', e => { p.attack = 0; touched = 0; });
    window.addEventListener('touchstart', e => {
      if (!p || !p.pos) return;
      if (e.touches[0].clientX < p.pos.x) {
        touchStartDiff.x = -(e.touches[0].clientX - p.pos.x);
      }
      else {
        touchStartDiff.x = p.pos.x - e.touches[0].clientX;
      }
      if (e.touches[0].clientY < p.pos.y) {
        touchStartDiff.y = -(e.touches[0].clientY - p.pos.y);
      }
      else {
        touchStartDiff.y = p.pos.y - e.touches[0].clientY;
      }
      p.attack = 1;
      touched = 1;
    });
    window.addEventListener('touchmove', e => {
      if (!p || !p.pos) return;
      p.attack = 1;
      touched = 1;
      p.pos.x = touchStartDiff.x + e.touches[0].clientX;
      p.pos.y = touchStartDiff.y + e.touches[0].clientY;
    });
  }
  , handle: () => {
    if (touched) return; //ignore when touch
    p.xSpeed = 0;
    p.ySpeed = 0;
    p.attack = 0;
    if (keys[Keys.LEFT] || keys['a'])  p.xSpeed = -1;
    if (keys[Keys.RIGHT] || keys['d']) p.xSpeed = 1;
    if (keys[Keys.UP] || keys['w'])    p.ySpeed = -1;
    if (keys[Keys.DOWN] || keys['s'])  p.ySpeed = 1;
    if (keys[' '] || keys['z'] || keys['k']) p.attack = 1;
    if (keys[Keys.ENTER]) {
      if (state === GAME_STATE.OVER) main.startGame();
      else if (state === GAME_STATE.END) main.startScreen();
    }
  }
};
