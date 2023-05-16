const express = require("express"); // Import the Express module
const { readFile } = require("fs"); // Import the readFile function from the fs module

const app = express(); // Create an Express application
const port = 1245; // The port number to listen on

function countStudents(fileName) {
  // Define a function named countStudents that accepts a fileName as a parameter
  const students = {}; // Create an empty object to store students
  const fields = {}; // Create an empty object to store fields
  let length = 0; // Initialize a variable to store the number of students

  return new Promise((resolve, reject) => {
    // Create and return a new Promise
    readFile(fileName, (err, data) => {
      // Read the contents of the file asynchronously
      if (err) {
        // If an error occurs while reading the file
        reject(err); // Reject the promise with the error
      } else {
        let output = ""; // Initialize a variable to store the output message
        const lines = data.toString().split("\n"); // Split the file contents into an array of lines

        for (let i = 0; i < lines.length; i += 1) {
          // Iterate over each line
          if (lines[i]) {
            // If the line is not empty
            length += 1; // Increment the number of students

            const field = lines[i].toString().split(","); // Split the line into an array of fields

            if (Object.prototype.hasOwnProperty.call(students, field[3])) {
              // If the students object already has the field
              students[field[3]].push(field[0]); // Add the student name to the field's array
            } else {
              students[field[3]] = [field[0]]; // Create a new array for the field and add the student name
            }

            if (Object.prototype.hasOwnProperty.call(fields, field[3])) {
              // If the fields object already has the field
              fields[field[3]] += 1; // Increment the number of students in the field
            } else {
              fields[field[3]] = 1; // Initialize the field with one student
            }
          }
        }

        const l = length - 1; // Calculate the final number of students

        output += `Number of students: ${l}\n`; // Append the number of students to the output

        for (const [key, value] of Object.entries(fields)) {
          // Iterate over each field and its corresponding number of students
          if (key !== "field") {
            // Exclude the "field" key
            output += `Number of students in ${key}: ${value}. `; // Append the field and its number of students to the output
            output += `List: ${students[key].join(", ")}\n`; // Append the list of students in the field to the output
          }
        }

        resolve(output); // Resolve the promise with the output
      }
    });
  });
}

app.get("/", (request, response) => {
  // Define a route handler for GET requests to the root path ('/')
  response.send("Hello Holberton School!"); // Send the response with the message "Hello Holberton School!"
});

app.get("/students", (request, response) => {
  // Define a route handler for GET requests to the '/students' path
  countStudents(process.argv[2].toString()) // Call the countStudents function with the provided argument
    .then((output) => {
      // If countStudents resolves successfully
      response.send(["This is the list of our students", output].join("\n")); // Send the response with the concatenated string
    })
    .catch(() => {
      // If countStudents throws an error
      response.send(
        "This is the list of our students\nCannot load the database"
      ); // Send the response with the error message
    });
});

app.listen(port, () => {
  // Start the server and listen for incoming requests on the specified port
});

module.exports = app; // Export the app object for external use (e.g., in testing or integration with other modules)
