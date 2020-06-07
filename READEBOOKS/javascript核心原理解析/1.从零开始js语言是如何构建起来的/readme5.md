## 05 | for (let x of [1,2,3]) ...：for循环并不比使用函数递归节省开销

# 块
    在 ECMAScript 6 之后，JavaScript 实现了块级作用域。
**绝大多数 JavaScript 语句都并没有自己的块级作用域。**
    switch语句被设计为有且仅有一个作用域，无论它有多少个 case 语句，其实都是运行在一个块级作用域环境中的。
```js
var x = 100, c = 'a'; 
switch (c) { 
    case 'a': 
        console.log(x); // ReferenceError 
        break; 
    case 'b': 
        let x = 200; 
        break; 
}
```
switch 语句内是无法访问到外部变量x的，即便声明变量x的分支case'b'永远都执行不到。这是因为所有分支都处在同一个块级作用域中，所以**任意分支的声明都会给该作用域添加这个标识符**，从而覆盖了全局的变量x。

# 循环语句中的块
- 并不是所有的循环语句都有自己的块级作用域，例如 while 和 do…while 语句就没有。
- 也不是所有 for 语句都有块级作用域。
    有且仅有       有自己的块级作用域
    ```js
        for (<let/const>…)
        for await (<let/const>x of …) …
        for (<let/const>x … in …) …
        for (<let/const>x … of …) …
    ```
- 在 ECMAScript 中，这是两套标识符体系，也是使用两套作用域来管理的:
    1. 所有”var 声明“和函数声明的标识符都登记为 varNames，使用“变量作用域”管理；
    2. 其它情况下的标识符 / 变量声明，都作为 lexicaNames 登记，使用“词法作用域”管理

# 总结
for 循环  存在两个作用域
  1.  for 语句的块级作用域称为 forEnv
  2. 循环体增加的作用域称为 loopEnv
  3. loopEnv 它的外部环境就指向 forEnv。
loopEnv 需要为每次迭代都创建一个新的作用域副本，这称为迭代环境（iterationEnv)。
所以 ，**在语法上这里只需要两个“块级作用域”，而实际运行时却需要为其中的第二个块级作用域创建无数个副本。**