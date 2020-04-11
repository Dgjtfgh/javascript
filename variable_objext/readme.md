# javascript变量对象与作用域链
学习：https://github.com/mqyqingfeng/Blog/issues/5

- 每个执行上下文，都有三个重要属性：
    1. 变量对象(Variable object，VO)
    2. 作用域链(Scope chain)
    3. this

- 变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。     
    不同执行上下文下的变量对象会有不同

全局上下文 (全局上下文中的变量对象就是全局对象)
  1. 可以通过 this 引用，在客户端 JavaScript 中，全局对象就是 Window 对象。
  2. 全局对象是由 Object 构造函数实例化的一个对象。
  3. 预定义一大堆函数和属性。
  4. 作为全局变量的宿主。
  5. 客户端 JavaScript 中，全局对象有 window 属性指向自身。

函数上下文 (变量对象：声明 和 执行)
    例子
```js
    console.log(foo);  // 函数foo()
    function foo(){
        console.log("foo");
    }
    var foo = 1;

// 进入执行上下文
    AO = {
        foo: reference to function foo(){}
    }
// 代码执行
    AO = {
        foo: 1
    }
```
  
- 作用域链
    js查找对象时，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。
    1. 函数创建
        链式结构的 next 指向 复制过来的父级作用域链
    2. 函数激活
        当前的作用域 concat 进 复制过来的父级作用域链