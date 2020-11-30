
const Items = (() => {
  let rand;
  const drop = pos => {
    rand = Rand.rand(15);
    switch (rand) {
      case 0: case 1: case 2:
        dropHealth(pos);
        break;
      case 4:
        dropPowerup(pos);
        break;
    }
  }
  const dropHealth = pos => {
    all.push({//health
      type: "item", pos, w: 20, h: 20, color: Colors.WHITE,
      render: me => {
        //400 ms per frame
        duration = 400;
        timeForAnimation = t % (4 * duration);
        if (timeForAnimation < duration) frame = 0;
        else if (timeForAnimation < duration * 2) frame = 1;
        else if (timeForAnimation < duration * 3) frame = 2;
        else if (timeForAnimation < duration * 4) frame = 1;
        Img.draw(me.pos, "moonshot-assets", 0, frame + 3);
      },
      action: () => { p.health += 30; if (p.health > 100) p.health = 100;
        zzfx(...[,,884,.49,.03,.88,1,.08,-1.2,,349,.06,.02,,12,,,.7,.09]);
        data["score"] += 1;
      }});
  };
  const dropPowerup = pos => {
    all.push({//improve attack speed
      type: "item", pos, w: 20, h: 20, color: Colors.BLUE,
      render: me => {
        //400 ms per frame
        duration = 400;
        timeForAnimation = t % (4 * duration);
        if (timeForAnimation < duration) frame = 0;
        else if (timeForAnimation < duration * 2) frame = 1;
        else if (timeForAnimation < duration * 3) frame = 2;
        else if (timeForAnimation < duration * 4) frame = 1;
        Img.draw(me.pos, "moonshot-assets", 1, frame + 3);
      },
      action: () => {
        p.attackSpeed -= ATTACK_SPEED.DECREASE_RATE;
        if (p.attackSpeed < ATTACK_SPEED.FASTEST) p.attackSpeed = ATTACK_SPEED.FASTEST;
        zzfx(...[1,,884,.49,.03,.88,1,.18,-1.2,,349,.06,.02,.1,13,,,.7,.1]);
        data["score"] += 1;
      }
    });
  }
  return {
    drop
  }
})();