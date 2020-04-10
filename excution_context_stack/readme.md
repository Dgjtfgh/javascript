# javascript执行上下文栈
学习： https://github.com/mqyqingfeng/Blog/issues/4

- js 如何管理上下文？
    栈

模拟过程

ECStack = [];  定义 栈

程序开始   初始化  全局
ECStack = [
    globalContext    // 程序结束之前， 栈最底部永远有个 全局执行上下文(globalContext)
];

// fun1()
ECStack.push(<fun1> functionContext);

* ECStack = [
    globalContext,
    <fun1> functionContext
];

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

* ECStack = [
    globalContext,
    <fun1> functionContext,
    <fun2> functionContext
];

// 擦，fun2还调用了fun3！
ECStack.push(<fun3> functionContext);

* ECStack = [
    globalContext,
    <fun1> functionContext,
    <fun2> functionContext,
    <fun3> functionContext
];

// fun3执行完毕
ECStack.pop();

* ECStack = [
    globalContext,
    <fun1> functionContext,
    <fun2> functionContext
];

// fun2执行完毕
ECStack.pop();

* ECStack = [
    globalContext,
    <fun1> functionContext
];

// fun1执行完毕
ECStack.pop();

* ECStack = [
    globalContext
];