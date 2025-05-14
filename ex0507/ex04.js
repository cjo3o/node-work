const a = {
    name: 'A',
    friend: ['nore', 'hero', 'wodo'],
    logFiend: function () {
        var that = this;
        this.friend.forEach(function (f) {
            console.log(that.name, f);
        })
    }
};
a.logFiend();

console.log('화살표 함수');
const b = {
    name: 'B',
    friend: ['nore', 'hero', 'wodo'],
    logFiend() {
        this.friend.forEach((f) => {
            console.log(f);
        })
    }
}
b.logFiend();