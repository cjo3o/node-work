const path = require('path');

console.log(path.join(__dirname, 'b', 'c', 'd'));
console.log(path.extname('ex01.js'));
console.log(path.basename('ex01.js'));
console.log(path.dirname('ex01.js'));
console.log(path.parse('ex01.js'));