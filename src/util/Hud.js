

const HEALTH_BAR = {
  WIDTH: 300,
  HEIGHT: 30,
  COLOR: Colors.WHITE,
};
const DAMAGE_SHAKE_MS = 500;
const Hud = (() => {
  let lastDamaged = 0, shake = false, xPos, yPos;
  const render = () => {
    renderHealthBar();
    renderAttackSpeedBar();
    renderScore();
  };
  const setLastDamaged = time => lastDamaged = time;
  const renderHealthBar = () => {
    shake = t - lastDamaged < DAMAGE_SHAKE_MS;
    xPos = 40 - (shake ? Rand.rand(10) - 20 : 0);
    yPos = 40 - (shake ? Rand.rand(10) - 20 : 0);
    const measure = Draw.text(`HP:`, {x: xPos, y: yPos, fontSize: 30, color: Colors.WHITE});
    xPos += measure.width - 20;
    //background
    const healthWidth = p.health / 100 * HEALTH_BAR.WIDTH;
    Draw.roundedRectUnit({
      x: (HEALTH_BAR.WIDTH / 2) + xPos, y: yPos + 4 - (HEALTH_BAR.HEIGHT / 2),
      w: HEALTH_BAR.WIDTH, h: HEALTH_BAR.HEIGHT, unitSize: 1, scale: 1,
      color: Colors.LIGHTRED
    });
    Draw.roundedRectUnit({
      x: (healthWidth / 2) + xPos, y: yPos + 4 - (HEALTH_BAR.HEIGHT / 2), w: healthWidth, h: HEALTH_BAR.HEIGHT,
      unitSize: 1, scale: 1, color: Colors.WHITE
    });
  };
  const renderAttackSpeedBar = () => {
    xPos = 40 - (shake ? Rand.rand(10) - 20 : 0);
    yPos = 80 - (shake ? Rand.rand(10) - 20 : 0);
    const measure = Draw.text(`AP:`, {x: xPos, y: yPos, fontSize: 30, color: Colors.WHITE});
    xPos += measure.width - 20;
    //background
    const total = ATTACK_SPEED.START - ATTACK_SPEED.FASTEST;
    const barWidth = (total - (p.attackSpeed - ATTACK_SPEED.FASTEST)) / total * HEALTH_BAR.WIDTH;
    Draw.roundedRectUnit({
      x: (HEALTH_BAR.WIDTH / 2) + xPos, y: yPos + 4 - (HEALTH_BAR.HEIGHT / 2),
      w: HEALTH_BAR.WIDTH, h: HEALTH_BAR.HEIGHT, unitSize: 1, scale: 1,
      color: Colors.LIGHTRED
    });
    Draw.roundedRectUnit({
      x: (barWidth / 2) + xPos, y: yPos + 4 - (HEALTH_BAR.HEIGHT / 2), w: barWidth, h: HEALTH_BAR.HEIGHT,
      unitSize: 1, scale: 1, color: Colors.BLUE
    });
  };
  const renderScore = () => {
    // Draw.text(`HP: ${p.health} / 100`, {x: c.width / 2, y: 50, fontSize: 30, color: Colors.WHITE}); 
    let xPos = c.width - 40
      , yPos = 40
    ;
    Draw.text(`Score: ${Num.thousandsSeparators(data["score"])}`, {
      x: xPos, y: yPos, fontSize: 30, color: Colors.WHITE, align: 'right'
    });
  };
  return {
    render, setLastDamaged
  }
})();