import { Character } from "./models/Characters.js";
import {
  Bandit,
  Dragon,
  GiantSpider,
  Goblin,
  Skeleton,
  Slime,
  Spirit,
} from "./models/Creatures.js";
import { mainMenu, startMenu } from "./userMenu.js";
const { log } = console;
import chalk from "chalk";
import inquirer from "inquirer";

export const createCharacter = ({ name, primary, secondary, tertiary }) => {
  const char = {
    name,
    hp: 5,
    mp: 5,
    atk: 5,
    def: 5,
    spd: 5,
    mag: 5,
    res: 5,
    luk: 5,
    [primary]: 50,
    [secondary]: 35,
    [tertiary]: 15,
  };
  saveCharacter(char);
  return new Character(char);
};

export const saveCharacter = character => {
  const savedCharacters = JSON.parse(localStorage.getItem("savedCharacters"));

  savedCharacters.push(character);
  localStorage.setItem("savedCharacters", JSON.stringify(savedCharacters));
  log(chalk.hex("#0356fc").bold("Character Saved!"));
};

export const fight = async (character, difficulty) => {
  const easyEnemy = [Slime, Goblin];
  const mediumEnemy = [Bandit, Skeleton, GiantSpider];
  const hardEnemy = [Dragon];
  const legendaryEnemy = [Spirit];
  let enemy = null;
  switch (difficulty) {
    case "easy":
      enemy = new easyEnemy[Math.floor(Math.random() * easyEnemy.length)]();
      break;
    case "medium":
      enemy = new mediumEnemy[Math.floor(Math.random() * mediumEnemy.length)]();
      break;
    case "hard":
      enemy = new hardEnemy[Math.floor(Math.random() * hardEnemy.length)]();
      break;
    case "legendary":
      enemy = new legendaryEnemy[
        Math.floor(Math.random() * legendaryEnemy.length)
      ]();
      break;
    default:
      enemy = new Slime();
      break;
  }
  log(chalk.hex("#0356fc").bold(`You have encountered a ${enemy.name}!`));
  let fight = true;
  while (fight) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["Attack", "Defend", "Use Item", "Run"],
      },
    ]);
    switch (action) {
      case "Attack":
        const damage = character.attack(enemy);
        log(
          chalk
            .hex("#0356fc")
            .bold(`You attack the ${enemy.name} for ${damage} damage!`)
        );
        if (enemy.hp <= 0) {
          log(
            chalk
              .hex("#0356fc")
              .bold(
                `You have defeated the ${enemy.name}! You gain ${enemy.exp} experience!`
              )
          );
          character.exp += enemy.exp;
          fight = false;
          return setTimeout(() => mainMenu(character), 5000);
        }
        break;
      case "Defend":
        log(chalk.hex("#0356fc").bold(`You defend yourself!`));
        break;
      case "Use Item":
        log(chalk.hex("#0356fc").bold(`You use an item!`));
        break;
      case "Run":
        log(chalk.hex("#0356fc").bold(`You run away!`));
        fight = false;
        break;
      default:
        break;
    }
    if (fight) {
      const enemyDamage = enemy.attack(character);
      log(
        chalk
          .hex("#0356fc")
          .bold(`The ${enemy.name} attacks you for ${enemyDamage} damage!`)
      );
      if (character.hp <= 0) {
        log(chalk.hex("#0356fc").bold(`You have died!`));
        fight = false;
        return setTimeout(startMenu, 5000);
      }
    }
  }
};
