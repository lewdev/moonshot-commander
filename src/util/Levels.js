
let INTERVALS_UNTIL_BOSS = 30;
const Levels = (() => {
  let interval;
  let isBoss = 0;
  let startX = 0;
  let intervalCount = 0;
  let boss = null;
  const start = () => {
    isBoss = 0;
    intervalCount = 0;
    interval = setInterval(spawnEnemies, 3000);
  }//Rand.range(2000, 5000)
  const spawnEnemies = () => {
    //generate enemies
    if (isBoss) {
      boss = all.find(a => a.name === "boss");
      if (boss) {
        for (i = 0; i < 3; i++) setTimeout(() => all.push(GameObjects.enemy({x: boss.pos.x, y: boss.pos.y}, "bot")), i * 100);
      }
      else {
        //boss is defeated
        clearInterval(interval);
        state = GAME_STATE.END;
      }
    }
    else {
      const enemyCount = Rand.range(1, 4);
      let enemyStartPos = {x: Rand.range(50, c.width - (enemyCount * 150)), y: 50};
      for (let i = 0; i < enemyCount; i++) {
        if (Rand.bool()) {
          all.push(GameObjects.enemy(enemyStartPos, "brute"));
        }
        else {
          startX = enemyStartPos.x;
          for (i = 0; i < 3; i++) setTimeout(() => all.push(GameObjects.enemy({x: startX, y: 0}, "bot")), i * 100);
        }
        enemyStartPos.x += 150;
      }
      intervalCount++;
    }
    if (intervalCount > INTERVALS_UNTIL_BOSS && !isBoss) {
      // setTimeout(() => {
        isBoss = 1;
        all.push(GameObjects.enemy({x: c.width / 2, y: 0}, "boss"));
      // }, 5000);
      Music.play("boss-music");
    }
  };
  return {
    start,
  }
})();
