const obj = {
    a: 10,
    b: function () {
        console.log('test');
    },
    c() {
        console.log('cc');
    }
}

obj =['asdf'] = "Asdf";

console.log(obj.a)
obj.b();
obj.c();
console.log(obj,`asdf`);