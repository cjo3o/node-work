const crypto = require('crypto');

console.log(crypto.createHash('sha256').update("hello world").digest('hex'));
console.log(crypto.createHash('sha256').update("hello world").digest('base64'));

// console.log(crypto.createHash('sha256').update("hello world").digest('hex'));