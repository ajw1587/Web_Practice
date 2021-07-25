var fs = require('fs');

// // readFileSync 동기적
// console.log('A');
// var result = fs.readFileSync('./fileread/sample.txt', 'utf8');
// console.log(result);
// console.log('C');


// readFile 비동기적
console.log('A');
var result = fs.readFile('./fileread/sample.txt', 'utf8', function(err,result)
{
    console.log(result);
});
console.log('C');