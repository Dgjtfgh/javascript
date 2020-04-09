// var value = 1;
// function foo() {
//     console.log(value);
// }
// function bar() {
//     var value = 2;
//     foo();
// }
// bar();   // 1    js采用的是静态作用域

// var scope = "global scope";
// function checkscope(){
//     var scope = "local scope";
//     function f(){
//         return scope;
//     }
//     return f();
// }
// console.log(checkscope());

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
console.log(checkscope()());