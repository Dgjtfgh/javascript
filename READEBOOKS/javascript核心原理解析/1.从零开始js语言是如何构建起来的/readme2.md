## 02 | var x = y = 100：声明语句与语法改变了JavaScript语言核心性质
# 声明
六种声明：
  1. let x 声明变量 x。不可在赋值之前读。
  2. const x 声明常量 x。不可写。
  3. var x 声明变量 x。在赋值之前可读取到 undefined 值。
  4. function x 声明变量 x。该变量指向一个函数。
  5. classx 声明变量 x。该变量指向一个类（该类的作用域内部是处理严格模式的）。
  6. import  导入标识符并作为常量（可以有多种声明标识符的模式和方法）。

- 除了这六个语句之外，还有两个语句有潜在的声明标识符的能力，不过它们并不是严格意义上的声明语句（声明只是它们的语法效果）。这两个语句是指：
for (var | let | const x) 
    for 语句有多种语法来声明一个或多个标识符，用作循环变量。
try … catch (x) …
    catch 子句可以声明一个或多个标识符，用作异常对象变量。
- 所有的“声明”：
    都意味着 JavaScript 将可以通过“静态”语法分析发现那些声明的标识符；
    标识符对应的变量 / 常量“一定”会在用户代码执行前就已经被创建在作用域中。

var  存在变量提升

- 标识符是在用户代码执行之前就已经由静态分析得到，并且创建在环境中，因此 let 声明的变量和 var 声明的变量在这一点上没有不同：它们都是在读取个“已经存在的”标识符名。
```js
var y = "outer"; 
function f() { 3 console.log(y); // undefined 
    console.log(x); // throw a Exception 
    let x = 100; 
    var y = 100; 
    ... 
}
```
1. var y所声明的那个标识符在函数 f() 创建（它自己的闭包）时就已经存在，所以才阻止了console.log(y)访问全局环境中的y。
2. let x所声明的那个x其实也已经存在 f() 函数的上下文环境中。访问它之所以会抛出异常（Exception），不是因为它不存在，而是因为这个标识符被拒绝访问了。(存在暂死区)

## NOTE：6 种声明语句中的函数是按 varDecls 的规则声明的；类的内部是处于严格模中，但它的名字仍然是按 varDecls 来处理的；import 导入的名字是按 const 的规则来处理的。所以所有的声明本质上只有三种处理模式：var 变量声明，let 变量声明，和const 常量声明。

# 赋值
    将右操作数（的值）赋给左操作数（的引用）。
严格语法表达式：LeftHandSideExpression< = | AssignmentOperator >AssignmentExpression

- 向一个不存在的变量名赋值，那么 JavaScript 会在全局范围内创建它。
    存在 **变量泄漏** 问题
ECMAScript5 开始的严格模式就禁止了这种特性，试图避免用户将变量泄露到全局环境。

# 变量声明是如何发生的呢？
- 早期
1. JavaScript 的全局环境是引擎使用一个称为“全局对象”东西管理起来的。
    JavaScript 引擎将全局的一些缺省对象、运行期环境的原生对象等东西都初始化在这个全局对象的属性中，并使用这个对象创建了一个称为**全局对象闭包**的东西，从而得到了 JavaScript 的全局环境。
2. 全局对象的属性表是可以动态添加的，JavaScript 将变量名作为属性名添加给全局对象。
3. 访问所谓全局变量时，就是访问这个全局对象的属性。

-  ECMAScript6 之后
1.  JavaScript 环境仍然是通过将全局对象初始化为这样的一个全局闭包来实现的。
2. ECMAScript 规定在这个全局对象之外再维护一个变量名列表（varNames），所有在静态语法分析期或在 eval() 中使用var声明的变量名就被放在这个列表中。约定，这个变量名列表中的变量是“直接声明的变量”，不能使用delete删除。
```js
var a = 100; 
    x = 200; 
// `a`和`x`都是 global 的属性
Object.getOwnPropertyDescriptor(global, 'a'); 
// { value: 100, writable: true, enumerable: true, configurable: false } 
Object.getOwnPropertyDescriptor(global, 'x'); 
// { value: 200, writable: true, enumerable: true, configurable: true } 

// `a`不能删除, `x`可以被删除
delete a // false 
delete x // true 

// 检查
a // 100 
x // ReferenceError: x is not define
```
当var声明发生在 eval() 中的时候，这一特性又还有所不同。
(唯一一种能从 varNames 中移除项的特例)
```js
// 使用 eval 声明
eval('var b = 300'); // 它的性质是可删除的
Object.getOwnPropertyDescriptor(global, 'b').configurable; //true 
// 检测与删除
b //300 
 delete b // true 
b // ReferenceError: b is not define
```

var x = y = 100 语句过程：
    等号的右边是一个表达式y = 100，它发生了一次“向不存在的变量赋值”，所以它隐式地声明了一个全局变量y，并赋值为 100。

# 总结
1. var 等声明语句总是在变量作用域（变量表）或词法作用域中静态地声明一个或多个标识符。
2. 全局变量的管理方式决定了“向一个不存在的变量赋值”所导致的变量泄露是不可避免的。
3. 动态添加的“var 声明”是可以删除的，这是唯一能操作 varNames 列表的方式（不过它并不存在多少实用意义）。
4. 变量声明在引擎的处理上被分成两个部分：
    一 部分是静态的、基于标识符的词法分析和管理，它总是在相应上下文的环境构建时作为名字创建的；
    另一部分是表达式执行过程，是对上述名字的赋值，这个过程也称为绑定。

