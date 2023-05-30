import chalk from "chalk";
import inquirer from "inquirer";
import { Character } from "./models/Characters.js";
import { createCharacter, fight, saveCharacter } from "./gameLogic.js";
const { log } = console;

export const welcome = () => {};
log(chalk.hex("#0356fc").bold.underline("Welcome to the game!"));

const initializeStorage = () => {
  //   localStorage.clear();
  const savedCharacters = localStorage.getItem("savedCharacters");
  if (!savedCharacters)
    localStorage.setItem("savedCharacters", JSON.stringify([]));
  return savedCharacters ? JSON.parse(savedCharacters) : [];
};

export const startMenu = async () => {
  const initStore = initializeStorage();

  const newGame = answers => answers.game === "New Game";

  //? Create list of saved characters
  const charChoices = savedCharacters => {
    // const savedCharacters = JSON.parse(localStorage.getItem("savedCharacters"));
    return savedCharacters.length
      ? savedCharacters.map(char => char.name)
      : ["No saved characters"];
  };

  //? Filter out the stats that are previously chosen
  const statChoices = answers => {
    const stats = ["hp", "mp", "atk", "def", "spd", "mag", "res", "luk"];
    return stats.filter(
      stat => stat !== answers?.primary && stat !== answers?.secondary
    );
  };

  const gameData = await inquirer.prompt([
    {
      type: "list",
      name: "game",
      message: "Would you like to start a new game or load a saved game?",
      choices: ["New Game", "Saved Game"],
    },
    {
      type: "list",
      name: "savedCharacters",
      message: "Which character would you like to load?",
      choices: () => charChoices(initStore),
      when: answers => !newGame(answers),
    },
    {
      type: "input",
      name: "name",
      message: "What is your new characters name?",
      when: answers => newGame(answers),
      validate: input => {
        log(input.trim().length < 1);

        if (
          input.trim().length < 1 ||
          charChoices(initStore).includes(input.trim())
        )
          return false;
        return true;
        // const it = initStore.find(char => char.name === input.trim());
        // log(it);
        // return it ? true : false;
      },
    },
    {
      type: "list",
      name: "primary",
      message: "Choose your primary stat. (50pts)",
      choices: answer => statChoices(answer),
      when: answers => newGame(answers),
    },
    {
      type: "list",
      name: "secondary",
      message: "Choose your secondary stat. (35pts)",
      choices: answer => statChoices(answer),
      when: answers => newGame(answers),
    },
    {
      type: "list",
      name: "tertiary",
      message: "Choose your tertiary stat. (15pts)",
      choices: answer => statChoices(answer),
      when: answers => newGame(answers),
    },
  ]);

  switch (gameData.game) {
    case "New Game":
      log(chalk.hex("#0356fc").bold("New Game Loading..."));
      return createCharacter(gameData);
    case "Saved Game":
      if (gameData.savedCharacters === "No saved characters")
        return startMenu();
      log(chalk.hex("#0356fc").bold("Saved Game Loading..."));
      return new Character(
        initStore.find(char => char.name === gameData.savedCharacters)
      );
    default:
      log(chalk.red.bold.strikethrough("Error Loading Game..."));
      return null;
  }
};

export const mainMenu = async character => {
  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: ["Fight", "Save", "Exit"],
    },
  ]);

  switch (option) {
    case "Fight":
      fightMenu(character);
      return "fight";
    case "Save":
      saveCharacter(character);
      return "save";
    case "Exit":
      log(chalk.hex("#0356fc").bold("See you next time..."));
      //   process.exit(0);
      Deno.exit(0);
      return "exit";
    default:
      Deno.exit(0);
      return "exit";
  }
};

export const fightMenu = async character => {
  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "How tough of a fight do you want?",
      choices: ["Easy", "Medium", "Hard", "Legendary"],
    },
  ]);

  switch (option) {
    case "Easy":
      return fight(character, "easy");
    case "Medium":
      return fight(character, "medium");
    case "Hard":
      return fight(character, "hard");
    case "Legendary":
      return fight(character, "Legendary");
    default:
      //   throw new Error("Error in fightMenu");
      log(chalk.red.bold.strikethrough("Error in fightMenu"));
  }
};
