const util = require('util');

const dontUseMe = util.deprecate(() => {
    console.log('dontUseMe');
}, "사용하지 않으면 좋겠다 이제 그만 사용해라");

dontUseMe();