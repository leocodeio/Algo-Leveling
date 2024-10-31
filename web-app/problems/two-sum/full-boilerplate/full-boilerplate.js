
  const input = require('fs').readFileSync('/path/to/input.txt', 'utf8').split('\n');
  const num1 = parseInt(input.shift());
  const num2 = parseInt(input.shift());
  const result = sum(num1, num2);
  console.log(result);