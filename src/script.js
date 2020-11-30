
const main = (() => {
  const APP_DATA_KEY = "moonshot-commander";
  let endScreenInterval;
  let startScreenInterval;
  window.onload = () => {
    c.width = 800; c.height = 600;
    document.body.appendChild(c);
    state = GAME_STATE.START;
    
    loadData();
    Keys.init();
    Img.init();
    startScreen();
  };
  const startScreen = () => {
    clearInterval(gameLoop);
    clearInterval(endScreenInterval);
    state = GAME_STATE.START;
    const img = IMG_MAP["start-screen"];
    Music.play("cruising-thru-space");
    startScreenInterval = setInterval(() => {
      if (state === GAME_STATE.START) {
        Draw.clear(Colors.BLACK);
        Keys.handle();
        ctx.drawImage(img.image, 0, 0, 800, 600, 0, 0, 800, 600);
        if (p.attack) startGame();
      }
    }, 30);
  };
  const startGame = () => {
    //set player start position
    Draw.clear(Colors.BLACK);
    clearInterval(gameLoop);
    clearInterval(startScreenInterval);
    state = GAME_STATE.PLAY;
    bgObj = []; fx = []; all = [];
    data["score"] = 0;
    p = {
      type: 'friend', health: 100, speed: 10,
      xSpeed: 0, ySpeed: 0, attack: 0,
      w: 60, h: 60, color: Colors.BLUE,
      lastAttack: t, attackSpeed: ATTACK_SPEED.START,//ms
      pos: { x: Draw.getCenterX(), y: 500 },
      attackMethod: e => {
        //double shot when the attack speed exceeds half way
        if (e.attackSpeed < ATTACK_SPEED.MID) {
          all.push(GameObjects.bullet({ x: e.pos.x - 10, y: e.pos.y }, false, 0, -1));
          all.push(GameObjects.bullet({ x: e.pos.x + 10, y: e.pos.y }, false, 0, -1));
        }
        else {
          all.push(GameObjects.bullet(e.pos, false, 0, -1));
        }
        zzfx(...[.3,,485,.01,,.03,1,.5,-2.4,,,,,,,,,.93,.04,.27]); // Shoot 10
      },
      render: me => {
        //400 ms per frame
        duration = 400;
        timeForAnimation = t % (4 * duration);
        if (timeForAnimation < duration) frame = 0;
        else if (timeForAnimation < duration * 2) frame = 1;
        else if (timeForAnimation < duration * 3) frame = 2;
        else if (timeForAnimation < duration * 4) frame = 1;
        Img.draw(me.pos, "moonshot-assets", 0, frame);
      },
    };
    all.push(p);
    Levels.start();
    //start background
    for (i = 0; i < 100; i++) {
      bgObj.push({
        xSpeed: 0, ySpeed: 1, w: 3, h: 3, color: Colors.WHITE, speed: Rand.range(1, 1.5) ,
        pos: { x: Rand.rand(c.width), y: Rand.rand(c.height) }
      });
    }
    Music.play("cruising-thru-space");
    gameLoop = setInterval(loop, 30);
  };
  const handleGameState = () => {
    if (state === GAME_STATE.START) {
      clearInterval(endScreenInterval);
    }
    if (state === GAME_STATE.PLAY) {
      clearInterval(startScreenInterval);
    }
    else if (state === GAME_STATE.OVER) {
      //draw game over
      Draw.text("GAME OVER", { x: c.width / 2, y: c.height / 2, color: Colors.WHITE, fontSize: 64});
      Draw.text("Press Enter to Try Again", { x: c.width / 2, y: (c.height / 2) + 100, color: Colors.WHITE, fontSize: 32});
    }
    else if (state === GAME_STATE.END) {
      clearInterval(gameLoop);
      const img = IMG_MAP["game-complete-screen"];
      Music.play("cruising-thru-space");
      endScreenInterval = setInterval(() => {
        if (state === GAME_STATE.END) {
          Draw.clear(Colors.BLACK);
          Keys.handle();
          ctx.drawImage(img.image, 0, 0, 800, 600, 0, 0, 800, 600);
        }
      }, 30);
    }
  };
  const playerDied = () => {
    zzfx(...[1.1,,885,.02,.16,1.65,1,2.9,.9,,,,.01,,1,.8,,.9,.09,.21]);
    Effects.addExplosion(p.pos.x, p.pos.y, 100);
    p.health = 0;
    p.remove = 1;
    Music.stop();
    state = GAME_STATE.OVER;
  };
  const loop = () => {
    t = (new Date()).getTime();
    Keys.handle();
    bgObj.sort(sortByPosY);
    all.sort(sortByPosY);
    updatePieces();
    handleCollisions();
    Draw.clear(Colors.BLACK);
    all = all.filter(a => !a.remove);
    render();
    handleGameState();
  };
  const sortByPosY = (a, b) => a.pos.y === b.pos.y ? 0 : a.pos.y < b.pos.y ? -1 : 1;
  const render = () => {
    //Draw
    bgObj.forEach(e => drawUnit(e));
    all.forEach(e => {
      if (e.render) e.render(e)
      else drawUnit(e);
    });
    Hud.render();
    Effects.handle();
  };
  const drawUnit = (e, color) => {
    // if (e.circle) Draw.circle({
    //   x: e.pos.x, y: e.pos.y, radius: e.w, unitSize: 1, scale: 1,
    //   color: color || e.color, rotate: e.rotate, glow: e.glow
    // });
    // else
    Draw.roundedRectUnit({
      x: e.pos.x, y: e.pos.y, w: e.w, h: e.h, unitSize: 1, scale: 1,
      color: color || e.color, r: 2, rotate: e.rotate, glow: e.glow
    });
  }
  const collided = (a, b) => !a.remove && !b.remove
    && b.pos.x + (b.w / 2) < a.pos.x + (a.w / 2 * 1.2)
    && b.pos.x - (b.w / 2) > a.pos.x - (a.w / 2 * 1.2)
    && b.pos.y - (b.h / 2) < a.pos.y + (a.h / 2 * 1.2)
    && b.pos.y + (b.h / 2) > a.pos.y - (a.h / 2 * 1.2)
  ;
  const handleCollisions = () => all.forEach((unit, i) => {
    //check collision
    if (unit.type === 'item') {
      const index = all.findIndex(a => unit !== a && a.type === 'friend' && collided(a, unit));
      if (index > -1) {
        unit.action();
        unit.remove = 1;
      }
    }
    else if (unit.type === 'bullet') {
      const index = all.findIndex(a => unit !== a 
        && ((a.type === 'enemy' && !unit.isEnemy) || (a.type === 'friend' && unit.isEnemy))
        && !unit.remove && collided(a, unit)
      );
      if (index > -1) {
        const hitUnit = all[index];
        const { x, y } = hitUnit.pos;
        hitUnit.health -= unit.damage;
        if (hitUnit.type === 'friend') Hud.setLastDamaged(t);
        //death of a unit
        if (hitUnit.health <= 0) {
          if (hitUnit.type === 'enemy') {
            // console.log("score ", data["score"]);
            data["score"] += 10;
            Items.drop(hitUnit.pos);
            zzfx(...[,,432,,.03,.4,4,2.39,,,,,,.4,,.2,,.76,.02]); // Hit 25
            if (hitUnit.name === 'bot') {
              Effects.addExplosion2(x, y, 20);
            }
            else Effects.addExplosion(x, y, 100);
          }
          else if (hitUnit.type === 'friend') {
            //death of player
            playerDied();
          }
          hitUnit.health = 0;
          hitUnit.remove = 1;
        }
        else {
          zzfx(...[.3,,432,,.03,.4,4,2.39,,,,,,.4,,.2,,.76,.02]); // Hit 25
          Effects.addExplosion(x, y, 10);
        }
        unit.remove = 1;
      }
      //edge of screen behavior
      if (unit.pos.y > c.height || unit.pos.y < 0 || unit.pos.x > c.width || unit.pos.x < 0) all[i].remove = 1;
    }
    else if (unit.name === 'bot' && collided(p, unit)) {
      //damage player, kill bot
      zzfx(...[,,432,,.03,.4,4,2.39,,,,,,.4,,.2,,.76,.02]); // Hit 25
      Effects.addExplosion2(unit.pos.x, unit.pos.y, 20);
      p.health -= unit.damage;
      unit.remove = 1;
      if (p.health <= 0) {
        //death of player
        playerDied();
      }
    }
    else if (unit.type === 'enemy' && (unit.pos.y > c.height || unit.pos.y < 0 || unit.pos.x > c.width || unit.pos.x < 0)) all[i].remove = 1;
    else {
      if (unit.pos.y > c.height) unit.pos.y = c.height;
      if (unit.pos.y < 0) unit.pos.y = 0;
      if (unit.pos.x > c.width) unit.pos.x = c.width;
      if (unit.pos.x < 0) unit.pos.x = 0;
    }
  });
  const updatePieces = () => {
    bgObj.forEach(unit => {
      unit.pos.x += unit.xSpeed * unit.speed; 
      unit.pos.y += unit.ySpeed * unit.speed;
      if (unit.pos.y > c.height) unit.pos.y = 0;
      if (unit.pos.y < 0) unit.pos.y = y.height;
      if (unit.pos.x > c.width) unit.pos.x = 0;
      if (unit.pos.x < 0) unit.pos.x = c.width;
    });
    all.forEach(e => {
      if (e.speed) {
        e.pos.x += e.xSpeed * e.speed; 
        e.pos.y += e.ySpeed * e.speed;
      }
      if (e.behavior) e.behavior(e);
      //shoot
      if (e.attack && t - e.lastAttack >= e.attackSpeed) {
        const isEnemy = e.type === 'enemy';
        e.lastAttack = t;
        if (e.attackMethod) e.attackMethod(e);
        // zzfx(...[.3,,452,.02,.08,.07,2,.53,7.4,,,,.09,.5,,,,.9,.07,.26]); // Shoot 17
        //if enemy, change attackSpeed
        if (isEnemy) {
          e.attackSpeed = Rand.range(750, 2000);
        }
      }
    });
  };
  const loadData = () => {
    const localData = window.localStorage.getItem(APP_DATA_KEY);
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData) {
        data = parsedData;
      }
    }
  };
  const saveData = () => {
    window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
  }
  const clearData = () => {
    window.localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
  }
  return { startGame, startScreen }
})();