const { readFile } = require("fs"); // Import the readFile function from the fs module

module.exports = function readDatabase(filePath) {
  const students = {}; // Create an empty object to store the student data
  return new Promise((resolve, reject) => {
    // Create a new Promise to handle the asynchronous file reading
    readFile(filePath, (err, data) => {
      // Read the file asynchronously and handle the result
      if (err) {
        // If an error occurs while reading the file
        reject(err); // Reject the promise with the error
      } else {
        const lines = data.toString().split("\n"); // Split the file contents into an array of lines
        const noHeader = lines.slice(1); // Remove the header line from the array of lines
        for (let i = 0; i < noHeader.length; i += 1) {
          // Iterate over each line (excluding the header)
          if (noHeader[i]) {
            // Check if the line is not empty
            const field = noHeader[i].toString().split(","); // Split the line into an array of fields using comma as the delimiter
            if (Object.prototype.hasOwnProperty.call(students, field[3])) {
              // Check if the field[3] (field containing the student's field) already exists as a key in the students object
              students[field[3]].push(field[0]); // If it exists, push the student's name (field[0]) into the corresponding field's array
            } else {
              students[field[3]] = [field[0]]; // If it doesn't exist, create a new key in the students object with the field[3] as the key and an array with the student's name (field[0]) as the value
            }
          }
        }
        resolve(students); // Resolve the promise with the populated students object
      }
    });
  });
};
