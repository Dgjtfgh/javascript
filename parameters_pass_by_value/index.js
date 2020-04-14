// var value = 1;
// function foo(v) {
//     v = 2;
//     console.log(v); //2
// }
// foo(value);
// console.log(value) // 1
// 当传递 value 到函数 foo 中，相当于拷贝了一份 value
// 函数中修改的是拷贝的value，不会影响原来的value

// var obj = {
//     value: 1
// };
// function foo(o) {
//     o.value = 2;
//     console.log(o.value); //2
// }
// foo(obj);
// console.log(obj.value) // 2
// 函数传递的是obj拷贝了一份obj 引用的副本 也就是指针指向的value不变，所以可以通过应用找到原值 修改

var obj = {
    value: 1
};
function foo(o) {
    o = 2;
    console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1
// 直接修改原值情况和第一个实例一样

// 不同在于  例二 涉及了 引用  也就是指针的指向