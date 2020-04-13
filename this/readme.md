# javascript this指向

1. 普通函数调用： 在严格模式下绑定到 undefined，否则绑定到全局对象。
2. call 或者 apply（ 或者 bind） 调用：严格模式下，绑定到指定的第一个参数。非严格模式下，null和undefined，指向全局对象（浏览器中是window），其余值指向被new Object()包装的对象。
3. 对象上的函数调用：绑定到那个对象。
4. new 调用：绑定到新创建的对象，  注意：显示return函数或对象，返回值不是新创建的对象，而是显式返回的函数或对象。

- 箭头函数
    1. 没有自己的this、super、arguments和new.target绑定。
    2. 不能使用new来调用。
    3. 没有原型对象。
    4. 不可以改变this的绑定。
    5. 形参名称不能重复。