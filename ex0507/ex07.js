const test = true;
new Promise((resolve, reject) => {
    if (test) {
        resolve('성공');
    } else {
        reject('실패');
    }
}).then((res) => {
    console.log(res);
})
    .catch((err) => {
        console.log(err);
    })

// const promise = new Promise((resolve, reject) => {
//     if (!test) {
//         reject('실패');
//     }
// });
//
// promise
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });