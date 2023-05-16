// Display the initial message
process.stdout.write("Welcome to Holberton School, what is your name?\n");

// Check if stdin is connected to a terminal (TTY)
if (process.stdin.isTTY) {
  // If stdin is a TTY (terminal), handle the 'data' event
  process.stdin.on("data", (data) => {
    // Write the name received from stdin to stdout
    process.stdout.write(`Your name is: ${data.toString()}`);
    // Exit the program
    process.exit();
  });
} else {
  // If stdin is not a TTY, handle the 'data' event
  process.stdin.on("data", (data) => {
    // Write the name received from stdin to stdout
    process.stdout.write(`Your name is: ${data.toString()}`);
    // Exit the program
    process.exit();
  });

  // Handle the 'exit' event when the program is closing
  process.on("exit", () => {
    // Write the closing message to stdout
    process.stdout.write("This important software is now closing\n");
  });
}
