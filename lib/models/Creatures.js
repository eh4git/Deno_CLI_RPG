import chalk from "chalk";
const { log } = console;

export class Enemy {
  constructor() {
    this.name = "Enemy";
    this.hp = 5;
    this.mp = 5;
    this.atk = 5;
    this.def = 5;
    this.spd = 5;
    this.mag = 5;
    this.res = 0;
    this.luk = 0;
    this.exp = 20;
  }
  displayStats() {
    log(
      chalk.red(`
        ${chalk.bold.underline(this.name)}
        HP: ${chalk.red.italic(this.hp)}
        MP: ${chalk.red.italic(this.mp)}
        ATK: ${chalk.red.italic(this.atk)}
        DEF: ${chalk.red.italic(this.def)}
        SPD: ${chalk.red.italic(this.spd)}
        MAG: ${chalk.red.italic(this.mag)}
        RES: ${chalk.red.italic(this.res)}
        LUK: ${chalk.red.italic(this.luk)}
        `)
    );
  }
  attack(character) {
    const criticalStrike = Math.random() < this.luk / 100;
    const damage = criticalStrike ? this.atk * 2 : this.atk;
    character.hp -= Math.max(0, damage - character.def);
    log(
      chalk.red(`
      ${this.name} attacks ${character.name} for ${Math.max(
        0,
        damage - character.def
      )} damage!
      `)
    );
    return character.hp;
  }
}

export class Goblin extends Enemy {
  constructor() {
    super();
    this.name = "Goblin";
    this.hp = 10;
    this.mp = 0;
    this.atk = 7;
    this.def = 3;
    this.mag = 0;
    this.luk = 1;
    this.exp = 35;
  }

  attack(character) {
    const specialSkill = Math.random() < this.luk / 100;
    if (specialSkill) {
      log(
        chalk.red(
          `${this.name} lets out a cry for help... ${chalk.italic(
            "more are coming!"
          )}`
        )
      );
      this.hp += 20;
      this.luk += 2;
    }
    const criticalStrike = Math.random() < this.luk / 100;
    const damage = criticalStrike ? this.atk * 2 : this.atk;
    character.hp -= Math.max(0, damage - character.def);
    log(
      chalk.red(`
      ${this.name} attacks ${character.name} for ${Math.max(
        0,
        damage - character.def
      )} damage!
      `)
    );
    return character;
  }
}

export class Slime extends Enemy {
  constructor() {
    super();
    this.name = "Slime";
    this.hp = 5;
    this.mp = 0;
    this.atk = 3;
    this.def = 1;
    this.mag = 0;
    this.luk = 0;
    this.exp = 15;
  }
}

export class Dragon extends Enemy {
  constructor() {
    super();
    this.name = "Dragon";
    this.hp = 50;
    this.mp = 20;
    this.atk = 45;
    this.def = 40;
    this.mag = 25;
    this.luk = 20;
    this.spd = 30;
    this.res = 20;
    this.exp = 100;
  }
}

export class Bandit extends Enemy {
  constructor() {
    super();
    this.name = "Bandit";
    this.hp = 25;
    this.mp = 0;
    this.atk = 20;
    this.def = 10;
    this.mag = 0;
    this.luk = 10;
    this.spd = 15;
    this.exp = 50;
  }
}

export class Skeleton extends Enemy {
  constructor() {
    super();
    this.name = "Skeleton";
    this.hp = 35;
    this.mp = 0;
    this.atk = 15;
    this.def = 7;
    this.mag = 0;
    this.luk = 5;
    this.res = 15;
    this.spd = 7.5;
    this.exp = 45;
  }
}

export class GiantSpider extends Enemy {
  constructor() {
    super();
    this.name = "Giant Spider";
    this.hp = 20;
    this.mp = 0;
    this.atk = 25;
    this.def = 5;
    this.mag = 0;
    this.luk = 5;
    this.spd = 15;
    this.exp = 40;
  }
}

export class Spirit extends Enemy {
  constructor() {
    super();
    this.name = "Spirit";
    this.hp = 200;
    this.mp = 100;
    this.atk = 25;
    this.def = 90;
    this.mag = Math.max(40, Math.floor(Math.random() * 55));
    this.luk = 30;
    this.spd = 10;
    this.exp = 200;
    this.res = 0;
  }
  attack(character) {
    const specialSkill = Math.random() < this.luk / 100;
    if (specialSkill) {
      log(
        chalk.red(
          `${this.name} lets out a piercing shrek... ${chalk.italic(
            "You feel your strength leaving you!"
          )}`
        )
      );
      character.hp -= this.mag - character.res;
      character.atk -= 25;
    }
    const criticalStrike = Math.random() < this.luk / 100;
    const damage = criticalStrike ? this.atk * 2 : this.atk;
    character.hp -= Math.max(0, damage - character.def);
    log(
      chalk.red(`
      ${this.name} attacks ${character.name} for ${Math.max(
        0,
        damage - character.def
      )} damage!
      `)
    );
    return character;
  }
}

class EnemyFactory {
  constructor() {
    this.enemies = {
      goblin: Goblin,
      slime: Slime,
      dragon: Dragon,
      bandit: Bandit,
      skeleton: Skeleton,
      giantSpider: GiantSpider,
    };
  }
  createEnemy(enemyType) {
    const Enemy = this.enemies[enemyType];
    return new Enemy();
  }
}
