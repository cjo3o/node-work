const obj = {
    a: 10,
    b: {
        c: 30
    },
    ccc() {
        console.log("ccc");
    }
}

// const a = obj.a;
// const c = obj.b.c;
// const ccc = obj.ccc;

const {a, b: {c}, ccc} = obj;

console.log(a);
console.log(c);
ccc();