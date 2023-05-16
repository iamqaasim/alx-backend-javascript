const express = require("express"); // Import the Express module

const app = express(); // Create an Express application
const port = 1245; // The port number to listen on

app.get("/", (request, response) => {
  // Define a route handler for GET requests to the root path ('/')
  response.send("Hello Holberton School!"); // Send the response with the message "Hello Holberton School!"
});

app.listen(port, () => {
  // Start the server and listen for incoming requests on the specified port
});

module.exports = app; // Export the app object for external use (e.g., in testing or integration with other modules)
