const { isNumber } = require("lodash");

function sum(a, b) {
  /* ваш код */
  if(isNumber(a) && isNumber(b))
  return a+b;
  else
  throw new TypeError();
}

module.exports = sum;
