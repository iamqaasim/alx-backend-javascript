const http = require("http"); // Import the 'http' module to create an HTTP server
const { readFile } = require("fs"); // Import the 'readFile' function from the 'fs' module

const hostname = "127.0.0.1"; // The hostname or IP address where the server will run
const port = 1245; // The port number to listen on

function countStudents(fileName) {
  const students = {}; // Store the students in an object
  const fields = {}; // Store the count of students in each field in an object
  let length = 0; // Store the total number of students

  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => {
      // Read the file asynchronously
      if (err) {
        reject(err); // If there's an error reading the file, reject the promise
      } else {
        let output = ""; // Store the output message

        const lines = data.toString().split("\n"); // Split the data into lines
        for (let i = 0; i < lines.length; i += 1) {
          // Iterate over each line
          if (lines[i]) {
            length += 1; // Increment the student count
            const field = lines[i].toString().split(","); // Split the line into fields

            if (Object.prototype.hasOwnProperty.call(students, field[3])) {
              students[field[3]].push(field[0]); // Add student name to the corresponding field
            } else {
              students[field[3]] = [field[0]]; // Create a new field with the student name
            }

            if (Object.prototype.hasOwnProperty.call(fields, field[3])) {
              fields[field[3]] += 1; // Increment the count of students in the field
            } else {
              fields[field[3]] = 1; // Initialize the count of students in the field
            }
          }
        }

        const l = length - 1;
        output += `Number of students: ${l}\n`; // Add the total student count to the output

        for (const [key, value] of Object.entries(fields)) {
          // Iterate over each field and its student count
          if (key !== "field") {
            output += `Number of students in ${key}: ${value}. `;
            output += `List: ${students[key].join(", ")}\n`; // Add the field and its students to the output
          }
        }

        resolve(output); // Resolve the promise with the output message
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
