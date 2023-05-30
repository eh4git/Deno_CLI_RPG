import inquirer from "inquirer";
import chalk from "chalk";
import { mainMenu, startMenu, welcome } from "./lib/userMenu.js";
const { log } = console;

const init = async () => {
  welcome();
  const character = await startMenu();

  character.displayStats();

  await mainMenu(character);
};

init();
