## 04 | export default function() {}：你无法导出一个匿名函数表达式

# 解析 export
```js
// 导出“（声明的）名字” 
export <let/const/var> x ...; 
export function x() ... 
export class x ... 
export {x, y, z, ...}; 

// 导出“（重命名的）名字” 
export { x as y, ...}; 1
export { x as default, ... }; 

// 导出“（其它模块的）名字
export ... from ...;

 // 导出“值” 
 export default <expression>
 ```
- 要导出一个模块的全部内容就必须导出“（全部的）名字和值”，然而纯粹的值没有名字，也就没法访问了
    所以 ECMAScript 6 模块约定了一个称为"default"的名字，用于来导出当前模块中的一个“值”。(export default)

# export 如何导出名字
  1. 导出一个名字，以及
  2. 为上述名字绑定一个值
在导出的时候，其实是先在“某个名字表”中登记一个“名字 x”就可以了。这个过程也就是 JavaScript 在模块装载之前对 export 所做的全部工作。

# 结论：
  1. 在处理 export/import 语句的全程，没有表达式被执行！
  2. 所谓模块的装配过程，就是执行一次顶层代码而已。
  3. export default function() {} 在严格意义上来说 并不是导出了一个匿名函数表达式，而是导出了一个匿名函数定义（Anonymous Function Definition）

补充：
1. export ...语句通常是按它的词法声明来创建的标识符的，例如export var x =...就意味着在当前模块环境中创建的是一个变量，并可以修改等等。但是当它被导入时，在import语句所在的模块中却是一个常量，因此总是不可写的。
2. 由于export default ...没有显式地约定名字“default（或default）”应该按let/const/var的哪一种来创建，因此 JavaScript 缺省将它创建成一个普通的变量（var），但即使是在当前模块环境中，它事实上也是不可写的，因为你无法访问一个命名为“default”的变量——它不是一个合法的标识符。
3. 所谓匿名函数，仅仅是当它直接作为操作数（而不是具有上述“匿名函数定义”的语法结构）时，才是真正匿名的
4. 导出项（的名字）总是作为词法声明被声明在当前模块作用域中的，这意味着它不可删除，且不可重复导出。亦即是说即使是用var x...来声明，这个x也是在_lexicalNames_ 中，而不是在 _varNames_ 中。
5. 所谓“某个名字表”，对于 export 来说是模块的导出表，对于 import 来说就是名字空间（名字空间是用户代码可以操作的组件，它映射自内部的模块导入名字表）。不过，如果用户代码不使用“import * as …”的语法来创建这个名字空间，那么该名字表就只存在于 JavaScript 的词法分析过程中，而不会（或并不必要）创建它在运行期的实例。它并不总是以实体形式存在的。