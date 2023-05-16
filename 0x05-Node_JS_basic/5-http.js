const http = require("http"); // Import the 'http' module to create an HTTP server
const { readFile } = require("fs"); // Import the 'readFile' function from the 'fs' module

const hostname = "127.0.0.1"; // The hostname or IP address where the server will run
const port = 1245; // The port number to listen on

function countStudents(fileName) {
  const students = {}; // Object to store students by field
  const fields = {}; // Object to store the count of students in each field
  let length = 0; // Variable to store the total number of students

  return new Promise((resolve, reject) => {
    readFile(fileName, (error, data) => {
      if (error) {
        reject(Error("Cannot load the database"));
      } else {
        const lines = data.toString().split("\n"); // Split file contents into lines

        for (let i = 0; i < lines.length; i += 1) {
          if (lines[i]) {
            length += 1; // Increment the total number of students

            const field = lines[i].toString().split(","); // Split each line into fields

            // Storing students by field
            if (Object.prototype.hasOwnProperty.call(students, field[3])) {
              students[field[3]].push(field[0]);
            } else {
              students[field[3]] = [field[0]];
            }

            // Counting students in each field
            if (Object.prototype.hasOwnProperty.call(fields, field[3])) {
              fields[field[3]] += 1;
            } else {
              fields[field[3]] = 1;
            }
          }
        }

        const len = length - 1; // Subtracting 1 to exclude the header line
        console.log(`Number of students: ${len}`);

        // Displaying the count of students and their names for each field
        for (const [key, value] of Object.entries(fields)) {
          if (key !== "field") {
            console.log(
              `Number of students in ${key}: ${value}. List: ${students[
                key
              ].join(", ")}`
            );
          }
        }
        resolve(data);
      }
    });
  });
}

const app = http.createServer((request, response) => {
  response.statusCode = 200; // Set the response status code to 200 (OK)
  response.setHeader("Content-Type", "text/plain"); // Set the response header to indicate plain text content

  if (request.url === "/") {
    // If the request URL is the root path
    response.write("Hello Holberton School!"); // Write "Hello Holberton School!" to the response body
    response.end(); // End the response
  }

  if (request.url === "/students") {
    // If the request URL is '/students'
    response.write("This is the list of our students\n"); // Write a message to the response body
    countStudents(process.argv[2].toString()) // Call the countStudents function with the provided file path
      .then((output) => {
        const outString = output.slice(0, -1); // Remove the last character from the output string
        response.end(outString); // Send the modified output as the response body
      })
      .catch(() => {
        response.statusCode = 404; // Set the response status code to 404 (Not Found)
        response.end("Cannot load the database"); // Write an error message to the response body
      });
  }
});

app.listen(port, hostname, () => {
  // Start the server and listen for incoming requests
});

module.exports = app; // Export the app object for external use (e.g., in testing or integration with other modules)
