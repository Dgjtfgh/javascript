### 11 | this：从JavaScript执行上下文的视角讲清楚this

# JavaScript 中的 this 是什么

- 全局执行上下文中的 this
    全局执行上下文中的 this 是指向 window 对象的。
    作用域链的最底端包含了 window 对象，全局执行上下文中的 this 也是指向 window 对象。

- 函数执行上下文中的 this
```js
function foo(){
  console.log(this) // window
}
foo()
```
- 三种方式来设置函数执行上下文中的 this 值:
    1. 通过函数的 call 方法设置
    2. 通过对象调用方法设置
        **在全局环境中调用一个函数，函数内部的 this 指向的是全局变量 window。**
        **通过一个对象来调用其内部的一个方法，该方法的执行上下文中的 this 指向对象本身。**
    3. 通过构造函数中设置
        通过 new 关键字构建好了一个新对象，并且构造函数中的 this 其实就是新对象本身。

# this的坑
  1. 嵌套函数中的 this 不会从外层函数中继承
```js
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)    // this 指向 myObj
    function bar(){console.log(this)}  // this 指向全局 window
    bar()
  }
}
myObj.showThis()
``` 
必坑操作： 1. 外层函数用 self 保存 this 内存函数使用 self。  2.  使用 ES6 中的箭头函数。

  2.  普通函数中的 this 默认指向全局对象 window
    在严格模式下，默认执行一个函数，其函数的执行上下文中的 this 值是 undefined。