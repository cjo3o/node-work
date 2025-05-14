class Human {
    constructor(type = 'human') {
        this.type = type;
    }
    // 정적 메서드인 isHuman은 객체 생성하지 않고 사용
    static isHuman(human) {
        console.log('인간이다' + human);
    }
    // 내부 메서드 prototype
    // 객체 생성하면 prototype 체인룰에서 생성
    // 개체 생성해서 사용
    brethe() {
        alert('스읍 하아~');
    }
}

const human = new Human();
// const human = {
//     type: 'human',
// };
console.dir(human);