var args = process.argv;
console.log(args);
console.log("A");
console.log("B");
if(args[2] == "1"){
    console.log("C1");
} else {
    console.log("C2");
}
console.log("D");

// console에 node 10_args.js ajw1587 입력
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'C:\\Users\\ajw15\\OneDrive\\바탕 화면\\web\\nodejs\\10_args.js',
//     'ajw1587'
// ]
// 배열형태로 출력
// 0번째 인자는 node의 위치
// 1번째 인자는 실행파일의 위치
// 2번째 인자부터는 받은 값