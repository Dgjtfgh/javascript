// 数组与类数组的区别
var array = ['name', 'age', 'sex'];
var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}
console.log(array[0]); // name
console.log(arrayLike[0]); // name
array[0] = 'new name';
arrayLike[0] = 'new name';
console.log(array[0]); // name
console.log(arrayLike[0]); // name
console.log(array.length); // 3
console.log(arrayLike.length); // 3
// arrayLike.push('4');  // TypeError: arrayLike.push is not a function

// 类数组 调用 数组方法
console.log(Array.prototype.join.call(arrayLike, '&')); // name&age&sex
console.log(Array.prototype.slice.call(arrayLike, 0)); // ["name", "age", "sex"] 
// slice可以做到类数组转数组
console.log(Array.prototype.map.call(arrayLike, function(item){
    return item.toUpperCase();
})); // ["NAME", "AGE", "SEX"]


// 类数组转数组
// 1. slice
console.log(Array.prototype.slice.call(arrayLike)); // ["name", "age", "sex"] 
// 2. splice
console.log(Array.prototype.splice.call(arrayLike, 0)); // ["name", "age", "sex"] 
// 3. ES6 Array.from
console.log(Array.from(arrayLike)); // ["name", "age", "sex"] 
// 4. apply
console.log(Array.prototype.concat.apply([],arrayLike));

// arguments对象
function foo1(name, age, sex) {
    console.log(arguments);
}
foo1('name', 'age', 'sex')  // [Arguments] { '0': 'name', '1': 'age', '2': 'sex' }

// length属性
function foo2(b, c, d){
    console.log("实参的长度为：" + arguments.length)
}
console.log("形参的长度为：" + foo2.length)
foo2(1)
// 形参的长度为：3
// 实参的长度为：1

// callee属性
var data = [];
for (var i = 0; i < 3; i++) {
    (data[i] = function () {
        console.log(arguments)
        console.log(arguments.callee)
        console.log(arguments.callee.i) 
    })(i);
}
data[0](); // [Arguments] { '0': 0 }  [Function]  undefined
data[1](); // [Arguments] { '0': 1 }  [Function]  undefined
data[2](); // [Arguments] { '0': 2 }  [Function]  undefined
for (var i = 0; i < 3; i++) {
    (data[i] = function () {
        console.log(arguments)
        console.log(arguments.callee)
        console.log(arguments.callee.i) 
    }).i = i;
}
data[0](); // [Arguments] {}  [Function] { i: 0 }  0
data[1](); // [Arguments] {}  [Function] { i: 1 }  1
data[2](); // [Arguments] {}  [Function] { i: 2 }  2
// Arguments 对象的 callee 属性，通过它可以调用函数自身。

// arguments和对应参数的绑定
function foo3(name, age, sex, hobbit) {
    console.log(name, arguments[0]); // name name

    // 改变形参
    name = 'new name';
    console.log(name, arguments[0]); // new name new name

    // 改变arguments
    arguments[1] = 'new age';
    console.log(age, arguments[1]); // new age new age

    // 测试未传入的是否会绑定
    console.log(sex); // undefined

    sex = 'new sex';
    console.log(sex, arguments[2]); // new sex undefined

    arguments[3] = 'new hobbit';
    console.log(hobbit, arguments[3]); // undefined new hobbit
}
foo3('name', 'age')
// 非严格模式下，传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享
// 严格模式下，实参和 arguments 是不会共享的。

// 使用 apply 将 foo 的参数传递给 bar
function foo4() {
    bar.apply(this, arguments);
}
function bar(a, b, c) {
   console.log(a, b, c);
}
foo4(1, 2, 3)  // 1 2 3