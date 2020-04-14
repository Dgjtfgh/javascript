# javascript 闭包

- 闭包：闭包是指那些能够访问自由变量的函数
    自由变量：指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。
闭包 = 函数 + 函数能够访问的自由变量 
```js
function fun1(){
    var n = 123456;
    function fun2(){    //f2是一个闭包
        console.log(n)
    }    
    return fun2;
}

fun1()(); // 123456
```
- f1是f2的父函数，f2被赋给了一个全局变量，f2始终存在内存中，f2的存在依赖f1，因此f1也始终存在内存中，不会在调用结束后，被垃圾回收机制回收。

js是弱类型语言，类里没有 private 关键字闭用于声明私有变量， 因此 可用闭包实现

```js
var data = [];
for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}
data[0]();  // 3
data[1]();  // 3
data[2]();  // 3
```
```js
var data = [];
for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}
data[0]();  // 0
data[1]();  // 1
data[2]();  // 2
```
两段代码全局上下文一样：
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
执行data[0]函数时
前者： 
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
后者多了个匿名函数：
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
闭包使得内存中始终保存了函数函数传进来的 i 不会在执行时又跑去上级查找i
