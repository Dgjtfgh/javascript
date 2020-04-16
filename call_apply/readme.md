# javascript call函数和apply函数

学习于：https://github.com/mqyqingfeng/Blog/issues/11

- call函数
    定义：使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
    语法：function.call(thisArg, arg1, arg2, ...)
    thisArg
        可选的。在 function 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
    arg1, arg2, ...
        指定的参数列表。

- apply函数
    定义：调用具有给定this值的函数，并arguments以数组（或类似数组的对象）的形式提供。
    语法：func.apply（thisArg， [ argsArray ]）
    thisArg
        this呼叫所提供的值func。

        注意：this该值可能不是该方法看到的实际值：如果该方法是非严格模式代码中的函数，null并且undefined将被全局对象替换，并且将原始值装箱。此参数是必需的。
    argsArray 可选的
        类似阵列的对象，指定与该参数func应该被调用，或null或者undefined，如果没有参数应提供给该函数。

还存在的问题：apply中
```js
Function.prototype.myApply = function (context) {    
    var context = Object(context) || window;
    ....
```
    写法  当第一个参数为null 时 this 无法指向全局
