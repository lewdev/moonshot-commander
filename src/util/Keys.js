
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
  , init: () => {
    window.addEventListener('keydown', function (e) {
      if (e.key !== undefined) keys[e.key] = e.type === 'keydown'; // Handle the event with KeyboardEvent.key and set handled true.
      if (e.defaultPrevented) return; // Should do nothing if the default action has been cancelled
      let handled = false;
      if (handled) e.preventDefault();// Suppress "double action" if event handled
    });
    window.addEventListener('keyup', e => keys[e.key] = (e.type == "keydown"));
  }
  , handle: () => {
    p.xSpeed = 0;
    p.ySpeed = 0;
    p.attack = 0;
    if (keys[Keys.LEFT] || keys['a'])  p.xSpeed = -1;
    if (keys[Keys.RIGHT] || keys['d']) p.xSpeed = 1;
    if (keys[Keys.UP] || keys['w'])    p.ySpeed = -1;
    if (keys[Keys.DOWN] || keys['s'])  p.ySpeed = 1;
    if (keys[' '] || keys['z'] || keys['k']) p.attack = 1;
  }
};
