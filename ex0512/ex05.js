//단방향 -> 암호화o -> sha512 방식
//양방향 -> 암호화o 복호화o

const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
    if (err) {
        console.error(err);
        return;
    }
    // console.log(buf);
    // console.log(buf.toString());
    const key = buf.toString('base64');
    // console.log(key);
    crypto.pbkdf2('password', key, 100000, 64, 'sha512', (err, deriveKey) => {
        console.log('password', deriveKey.toString('base64'));
    })
})