function sum(a, b) {
  if (isNaN(parseFloat(a)) || isNaN(parseFloat(b)) ) {
    throw new TypeError('Arguments must be a numbers');
  }
  return a + b;
}

module.exports = sum;
