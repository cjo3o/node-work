const util = require('util');
const crypto = require('crypto');

// crypto.randomBytes(64, (err, buf) => {
//     const key = buf.toString('base64');
//     console.log('key', key);
// });
//
// const aa = util.promisify(crypto.randomBytes);
// aa(64).then((buf) => {
//   const key = buf.toString("base64");
//   console.log('key', key);
// });

const myFunc = function (aa, bb) {
    console.log(aa, bb)
}

const myFuncPromi = util.promisify(myFunc);
myFuncPromi(1,2).then((result) => {
    console.log(result);
});