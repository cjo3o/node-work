function a() {
    for (let i = 0; i<10_000_000_000; i++) {

    }
}

console.log('오래걸리는거 시작 블로킹');
a();
console.log('오래걸리는거 끝 블로킹');