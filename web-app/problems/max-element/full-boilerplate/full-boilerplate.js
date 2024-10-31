
  const input = require('fs').readFileSync('/path/to/input.txt', 'utf8').split('\n');
  const arr = input.slice(0, size).map(Number);
  const result = maxElement(arr);
  console.log(result);