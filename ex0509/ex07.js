let i = 1;
setInterval(() => {
    if (i === 5) {
        process.exit();
    }
    console.log(i++);
},0)

console.log("비동기함수");