- 区别
    1. var 定义变量，没有块的概念，可以跨块访问，不能跨函数访问，不初始化出现undefined，不会报错。
    2. let 定义变量，只能在块作用域里访问，也不能跨函数访问，对函数外部无影响。
    3. const 定义常量，只能在块作用域里访问，也不能跨函数访问，使用时必须初始化(即必须赋值)，而且不能修改。

var 与 let
```js
for (let i = 0; i <= 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 0);
}
// 输出：0 1 2 3 
for (var i = 0; i <= 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 0);
}
// 输出：4 4 4 4 
```

for  会创建 4各 相互独立的作用域 
    let 声明在每个作用域中 独立的  有 4 个不同的 i 
    var 声明在全局中 

    js 的 setTimeout() 异步机制  setTimeout() 会在for循环后执行