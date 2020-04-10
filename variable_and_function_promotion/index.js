// var foo = function () {
//     console.log('foo1');
// }

// foo();  // foo1

// var foo = function () {
//     console.log('foo2');
// }

// foo(); // foo2

// function foo() {
//     console.log('foo1');
// }

// foo();  // foo2

// function foo() {
//     console.log('foo2');
// }

// foo(); // foo2

function v() {
    console.log(a);  // undefined
    a = 'aaa';
    console.log(a);  // aaa
    var a = 'bbb';
    console.log(a);  // bbb
}
v();

function foo() {
    console.log(a);  // [Function: a]
    function a() {}
    console.log(a);  // [Function: a]
    var a = 1;
    console.log(a);  // 1
}
foo();