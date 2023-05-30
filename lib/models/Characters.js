import inquirer from "inquirer";
import chalk from "chalk";

export class Character {
  constructor({ name, hp, mp, atk, def, spd, mag, res, luk }) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.atk = atk;
    this.def = def;
    this.spd = spd;
    this.mag = mag;
    this.res = res;
    this.luk = luk;
    this.exp = 0;
    this.level = 1;
  }

  displayStats() {
    console.log(
      chalk.green(`
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

  async walk() {
    const directions = [
      { name: "North", key: "w", value: "n" },
      { name: "South", key: "s", value: "s" },
      { name: "East", key: "d", value: "e" },
      { name: "West", key: "a", value: "w" },
    ];
    try {
      const { direction } = await inquirer.prompt([
        {
          type: "expand",
          name: "direction",
          message: "Which direction would you like to go?",
          choices: directions,
        },
        {
          type: "number",
          name: "steps",
          message: "How many steps would you like to take?",
          choices: function () {
            const maxSteps = (this.spd * 1.5) / 4.5;
            const steps = [];
            for (let i = 1; i <= maxSteps; i++) {
              steps.push(i);
            }
            return steps;
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  }
  attack(enemy) {
    const criticalStrike = Math.random() < this.luk / 100;
    const damage = criticalStrike ? this.atk * 2 : this.atk;
    enemy.hp -= Math.max(0, damage - enemy.def);
    console.log(
      chalk.red(`
      ${this.name} attacks ${enemy.name} for ${Math.max(
        0,
        damage - enemy.def
      )} damage!
      `)
    );
    return enemy;
  }
  levelUp() {
    this.level++;
    this.hp += this.lvl * 1.25 + 5;
    this.mp += this.lvl * 1.25 + 5;
    this.atk += this.lvl * 1.25 + 5;
    this.def += this.lvl * 1.25 + 5;
    this.spd += this.lvl * 1.25 + 5;
    this.mag += this.lvl * 1.25 + 5;
    this.res += this.lvl * 1.25 + 5;
    this.luk += this.lvl * 1.25 + 5;
  }
}
