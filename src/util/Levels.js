
const Levels = (() => {
  let interval;
  let level = 1;
  let isBoss = 0;
  const setLevel = levelArg => {
    level = levelArg;
    isBoss = 0;
  }
  const start = () => interval = setInterval(spawnEnemies, Rand.range(2000, 5000));
  const spawnEnemies = () => {
    //generate enemies
    const enemyCount = Rand.range(1, 4);
    let enemyStartPos = {x: Rand.range(50, c.width - (enemyCount * 150)), y: 50};
    for (let i = 0; i < enemyCount; i++) {
      all.push({
        type: 'enemy',
        health: 100,
        speed: 3,
        xSpeed: 0,
        ySpeed: 1,
        attack: 1, attackSpeed: Rand.range(750, 2000), lastAttack: t,
        w: 50, h: 50, color: Colors.DARKRED,
        pos: { x: enemyStartPos.x, y: enemyStartPos.y },
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
      });
      enemyStartPos.x += 150;
    }
  };
  return {
    start,
    setLevel,
  }
})();
