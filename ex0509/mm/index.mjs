console.log('import 구문이 밑에 있음');

if (true) {
    import QWER, {aa, bb, ccFunc} from './var.mjs'
}
console.log("QWER", QWER);
console.log('aa', aa);
console.log('bb', bb);
console.log('cc', ccFunc);

