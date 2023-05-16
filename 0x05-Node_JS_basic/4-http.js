const http = require("http");

const hostname = "127.0.0.1"; // The hostname or IP address where the server will run
const port = 1245; // The port number to listen on

const app = http.createServer((request, response) => {
  // Create an HTTP server with a request listener function
  response.statusCode = 200; // Set the response status code to 200 (OK)
  response.setHeader("Content-Type", "text/plain"); // Set the response header to indicate plain text content
  response.end("Hello Holberton School!"); // Send the response body as "Hello Holberton School!"
});

app.listen(port, hostname, () => {
  // Start the server and listen for incoming requests
});

module.exports = app; // Export the app object for external use (e.g., in testing or integration with other modules)
