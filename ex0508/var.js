const odd = "홀수입니다.";
const even = "짝수입니다.";
const aa = () => {
    console.log("함수보냄");
}

// module 사용방법
// export const name = "dddd";
// export const aaa = () => {
//
// }

// common.js 사용방법
module.exports = {
    odd,
    even,
    aa
}

