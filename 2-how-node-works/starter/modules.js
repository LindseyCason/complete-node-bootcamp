const C = require("./test-module-1");
//Module.exports
const calc1 = new C();
console.log(calc1.add(2, 5));

//exports
// const calc2 = require("./test-module-2");
// console.log(calc2.multiply(2, 5));
//OR

//destructured

const { add, multiply, divide, subtract } = require("./test-module-2");
console.log(add(5, 6), multiply(9, 3), subtract(5, 1), divide(14, 2));

//caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
