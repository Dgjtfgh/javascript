// function executor(resolve, reject) {
//     let rand = Math.random();
//     console.log(1)
//     console.log(rand)
//     if (rand > 0.5)
//         resolve()
//     else
//         reject()
// }
// var p0 = new Promise(executor);
// var p1 = p0.then((value) => {
//     console.log("succeed-1")
//     return new Promise(executor)
// })
// var p3 = p1.then((value) => {
//     console.log("succeed-2")
//     return new Promise(executor)
// })
// var p4 = p3.then((value) => {
//     console.log("succeed-3")
//     return new Promise(executor)
// })
// p4.catch((error) => {
//     console.log("error")
// })
// console.log(2)

// let p1 = Promise.resolve(1);
// let p2 = Promise.reject(2);
// Promise.all([p1, p2])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// Promise.race([p1, p2])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// 模拟实现promise
function Bromise(executor) {
    var onResolve_ = null
    var onReject_ = null
     // 模拟实现 resolve 和 then，暂不支持 rejcet
    this.then = function (onResolve, onReject) {
        onResolve_ = onResolve
    };
    function resolve(value) {
          setTimeout(()=>{
            onResolve_(value)
           },0)
    }
    executor(resolve, null);
}

function executor(resolve, reject) {
    resolve(100)
}

// 将 Promise 改成我们自己的 Bromsie
let demo = new Bromise(executor)
 
function onResolve(value){
    console.log(value)
}
demo.then(onResolve)