
//creates said game objects based on parameters
const GameObjects = {
  bullet: (pos, isEnemy, directionX, directionY = 1, size) => ({
    damage: isEnemy ? BULLET_DAMAGE.enemy : BULLET_DAMAGE.player,
    type: "bullet",
    radius: 5,
    isEnemy,
    pos: { x: pos.x, y: pos.y },
    ySpeed: directionY,
    xSpeed: directionX ? directionX : 0,
    speed: isEnemy ? 10 : 20,
    w: 10, h: isEnemy ? 10 : 30,
    glow: 1,
    circle: isEnemy ? 1 : 0,
    color: isEnemy ? Colors.YELLOW : Colors.BLUE
  }),
  enemy: (pos, name) => {
    switch(name) {
      case 'bot':
        return GameObjects.enemyBot(pos);
      case 'boss':
        return GameObjects.enemyBoss(pos);
      case 'brute':
      default:
        return GameObjects.enemyBrute(pos);
    }
  },
  enemyBrute: pos => ({
    type: 'enemy', name: 'brute', health: 100,
    speed: 3, xSpeed: 0, ySpeed: 1,
    attack: 1, attackSpeed: Rand.range(750, 2000), lastAttack: t,
    w: 50, h: 50, color: Colors.DARKRED,
    pos: { x: pos.x, y: pos.y },
    attackMethod: e => {
      zzfx(...[.3,,485,.01,,.03,1,.5,-2.4,,,,,,,,,.93,.04,.27]); // Shoot 10
      all.push(GameObjects.bullet(e.pos, true, 1));
      all.push(GameObjects.bullet(e.pos, true, -1));
      e.attackSpeed = Rand.range(750, 2000);
    },
    render: (me) => {
        //400 ms per frame
      duration = 400;
      timeForAnimation = t % (4 * duration);
      if (timeForAnimation < duration) frame = 1;
      else if (timeForAnimation < duration * 2) frame = 0;
      else if (timeForAnimation < duration * 3) frame = 2;
      else if (timeForAnimation < duration * 4) frame = 0;
      Img.draw(me.pos, "moonshot-assets", 1, frame);
    },
  }),
  enemyBot: pos => ({
    type: 'enemy', name: 'bot', health: 10, damage: BULLET_DAMAGE.bot,
    speed: 2, xSpeed: 0, ySpeed: 4,
    attack: 1, attackSpeed: 9999, lastAttack: t,
    w: 40, h: 40, color: Colors.DARKRED,
    pos: { x: pos.x, y: pos.y },
    attackMethod: () => {},
    behavior: me => {
      if (p.pos.x > me.pos.x) me.xSpeed = 1;
      else if (p.pos.x < me.pos.x) me.xSpeed = -1;
      else me.xSpeed = 0;
    },
    render: e => {
      //400 ms per frame
      duration = 200;
      timeForAnimation = t % (4 * duration);
      if (timeForAnimation < duration) frame = 1;
      else if (timeForAnimation < duration * 2) frame = 0;
      else if (timeForAnimation < duration * 3) frame = 2;
      else if (timeForAnimation < duration * 4) frame = 0;
      Img.draw(e.pos, "moonshot-assets", 4, frame);
    },
  }),
  enemyBoss: pos => ({
    type: 'enemy', name: 'boss', health: 8000,
    speed: 3, xSpeed: 0, ySpeed: 1, lastMove: t, nextMove: -1,
    attack: 1, attackSpeed: 500, lastAttack: t,
    w: 64, h: 64, color: Colors.DARKRED,
    pos: { x: pos.x, y: pos.y },
    attackMethod: e => {
      for (i = 0; i < 3; i++) {
        setTimeout(() => {
          zzfx(...[.3,,485,.01,,.03,1,.5,-2.4,,,,,,,,,.93,.04,.27]); // Shoot 10
          all.push(GameObjects.bullet(e.pos, true, 1));
          all.push(GameObjects.bullet(e.pos, true, -1));
          all.push(GameObjects.bullet(e.pos, true, 0, 1));
        }, i * 100);
      }
    },
    behavior: e => {
      if (e.pos.y >= 150 && e.ySpeed !== 0) {
        e.xSpeed = e.nextMove;
        e.ySpeed = 0;
        e.speed = 4;
      }
      if (e.xSpeed === 0) {
        if (t - e.lastMove >= 2000) {
          e.xSpeed = e.nextMove;
          e.nextMove = -e.nextMove;
        }
      }
      else if (e.ySpeed === 0) {
        if (e.xSpeed === 1) {
          if (e.pos.x > c.width - 150) {
            e.xSpeed = 0;
            e.lastMove = t;
            e.pos.x = c.width - 150;
          }
        }
        else if (e.xSpeed === -1) {
          if (e.pos.x < 150) {
            e.xSpeed = 0;
            e.lastMove = t;
            e.pos.x = 150;
          }
        }
      }
    },
    render: (me) => {
      //400 ms per frame
      duration = 400;
      timeForAnimation = t % (4 * duration);
      if (timeForAnimation < duration) frame = 1;
      else if (timeForAnimation < duration * 2) frame = 0;
      else if (timeForAnimation < duration * 3) frame = 2;
      else if (timeForAnimation < duration * 4) frame = 0;
      //draw(pos, imgName, row, col, tileSize = 64, zoom = 1)
      Img.draw(me.pos, "moonshot-assets", 1, frame, 128);
    },
  }),
};