import inquirer from "inquirer";
import { Character } from "./lib/models/Characters.js";

const directions = [
  { name: "North", key: "w", value: "n" },
  { name: "South", key: "s", value: "s" },
  { name: "East", key: "d", value: "e" },
  { name: "West", key: "a", value: "w" },
];

inquirer
  .prompt({
    type: "expand",
    name: "direction",
    message: "Which direction would you like to go?",
    choices: directions,
  })
  .then(answers => {
    console.log(answers);
    const hero = new Character("Hero", 100, 100, 10, 10, 10, 10, 10, 10);
    console.log(hero);
  });
