const fs = require("fs");

function countStudents(fileName) {
  const students = {}; // Object to store students by field
  const fields = {}; // Object to store the count of students in each field
  let length = 0; // Variable to store the total number of students

  try {
    const fileContents = fs.readFileSync(fileName, "utf-8"); // Read the file synchronously
    const lines = fileContents.toString().split("\n"); // Split file contents into lines

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
          `Number of students in ${key}: ${value}. List: ${students[key].join(
            ", "
          )}`
        );
      }
    }
  } catch (error) {
    throw Error("Cannot load the database");
  }
}

module.exports = countStudents;
