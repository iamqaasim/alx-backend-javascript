const readline = require("readline");

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display the initial message
console.log("Welcome to Holberton School, what is your name?");

// Prompt the user for their name
rl.question("", (name) => {
  // Display the user's name
  console.log(`Your name is: ${name}`);

  // Close the program
  console.log("This important software is now closing");
  rl.close();
});

// Handle the "close" event
rl.on("close", () => {
  process.exit(0);
});
