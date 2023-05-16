const readline = require("readline");

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display the initial message
console.log("Welcome to Holberton School, what is your name?");

// Prompt the user for their name
rl.on("line", (input) => {
  const name = input.trim();

  // Display the user's name
  console.log("Your name is:", name);

  // Close the program after prompt
  console.log("This important software is now closing");
  rl.close();
});
