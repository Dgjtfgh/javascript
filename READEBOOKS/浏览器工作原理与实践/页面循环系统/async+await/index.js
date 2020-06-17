// function* genDemo() {
//     console.log(" 开始执行第一段 ")
//     yield 'generator 1'
 
//     console.log(" 开始执行第二段 ")
//     yield 'generator 2'
 
//     console.log(" 开始执行第三段 ")
//     yield 'generator 3'
 
//     console.log(" 执行结束 ")
//     return 'generator end'
// }
 
// console.log('main 0')
// let gen = genDemo()
// console.log(gen.next().value) // generator 1
// console.log('main 1')
// console.log(gen.next().value) // generator 2
// console.log('main 2')
// console.log(gen.next().value) // generator 3
// console.log('main 3')
// console.log(gen.next().value) // generator end
// console.log('main 4')

// async function foo() {
//     console.log(1)    //2
//     let a = await 100
//     console.log(a)    // 4
//     console.log(2)    // 5
// }
// console.log(0)  // 1
// foo()
// console.log(3)  // 3

async function foo() {
    console.log('foo')
}
async function bar() {
    console.log('bar start')  // 2
    await foo()               // 3
    console.log('bar end')    // 6
}
console.log('script start')  // 1
setTimeout(function () {
    console.log('setTimeout')  // 8
}, 0)
bar();
new Promise(function (resolve) {
    console.log('promise executor') // 4
    resolve();
}).then(function () {
    console.log('promise then')    // 7
})
console.log('script end')  // 5