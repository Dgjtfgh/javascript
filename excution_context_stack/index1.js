// var p = (
//   function (a) {
//     this.a = a;
//     return function (b) {
//          return this.a + b;
//    }
// }(
//   function (a, b) {
//   return a;
// }(1, 2)
// )
// );
// console.log(p(4))  // 5


var nAdd;
var t = function() {
    var n = 99;
    nAdd = function() {
      n++;
    }
    var t2 = function() {
    	console.log(n)
    }
    return t2;
};

var a1 = t();   // a1 的 nAdd挂在了全局
var a2 = t();   // a2 的 nAdd挂在了全局 覆盖了a1 的 nAdd

nAdd();       // a2 的 n 加了 1

a1(); //99
a2(); //100

