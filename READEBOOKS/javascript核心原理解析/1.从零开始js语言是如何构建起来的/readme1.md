# JavaScript核心原理解析笔记
- JavaScript 强行定义了“Object 和 Function 就是引用类
型”
    对象和函数按引用来传递和使用。

引入问题
    delete x 可能是删除一个值，也可能是删除一个引用，还可能是删除一个global 对象上的属性。
解决过程
- JavaScript 1.2 的时代并没有结构化异常处理（即 try…catch 语句）
    所以，JavaScript 认为“所有删除值的 delete 就直接返回 true”，表明该行为过程中没有异常。
    返回值只表明执行过程中没有异常，但实际的执行行为是“什么也没发生”。
    delete 0 不可能真的将“0”从执行系统中清理出去。
- 还剩下删除变量和删除属性 两种

delelet 这个操作的正式语法设计并不是“删除某个东西”，而是“删除一个表达式
的结果”.
JavaScript 中所有一切表达式运算的终极目的都是为了得到一个值，然后再用另外一些操作将这个值输出出来。
JavaScript 中，有两个东西可以被执行并存在执行结果值（Result），包括语句和表达式。

delete 0   将 0 视为一个表达式，并尝试删除它的求值结果。
    JavaScript 需要检测这个 Result 的类型：
        如果它是值，则按照传统的 JavaScript 的约定返回 true；
        如果它是一个引用，那么对该引用进行分析，以决定如何操作。
# ECMAScript 约定：任何表达式计算的结果（Result）要么是一个值，要么是一个引用。

- x = x  把值 x 赋给引用 x 
    如果 x 放在左边作为 lhs，那么它是引用；如果放在右边作为 rhs，那么就是值。
# “delete x”归根到底，是在删除一个表达式的、引用类型的结果（Result），而不是在删除 x 表达式，或者这个删除表达式的值（Value）。

    delete 0中的这个0是一个表达式求值；
    delete x中的x是一个引用；
    delete obj.x中obj.x是一组表达式连续运算的结果（Result/ 引用）；

## 总结
    当 x 是全局对象 global 的属性时，所谓delete x其实只需要返回global.x这个引用就可以了。而当它不是全局对象 global 的属性时，那么就需要从当前环境中找到一个名为x的引用。找到这两种不同的引用的过程，称为ResolveBinding；而这两种不同的x，称为不同环境下绑定的标识符 / 名字。