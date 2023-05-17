function calculateNumber(a, b) {
    const value_1 = Math.round(a);
    const value_2 = Math.round(b);
    const c = value_1 + value_2;
    return c;
}

module.exports = calculateNumber;