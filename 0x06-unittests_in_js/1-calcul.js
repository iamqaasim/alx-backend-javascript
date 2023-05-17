function calculateNumber(type, a, b) {
  const value_1 = Math.round(a);
  const value_2 = Math.round(b);
  let c = 0;
  switch (type) {
    case "SUM":
      c = value_1 + value_2;
      break;
    case "SUBTRACT":
      c = value_1 - value_2;
      break;
    case "DIVIDE":
      if (value_2 === 0) {
        c = "Error";
      } else {
        c = value_1 / value_2;
      }
      break;
  }
  return c;
}

module.exports = calculateNumber;
