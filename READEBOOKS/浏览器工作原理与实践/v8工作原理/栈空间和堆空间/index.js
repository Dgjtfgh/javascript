// function foo(){
//     var a = 1
//     var b = a
//     a = 2
//     console.log(a)  // 2
//     console.log(b)  // 1
// }
// foo()

// function foo(){
//     var a = {name:" 极客时间 "}
//     var b = a
//     a.name = " 极客邦 " 
//     console.log(a)  // { name: ' 极客邦 ' }
//     console.log(b)  // { name: ' 极客邦 ' }
// }
// foo()

let jack = {
    name : "jack.ma",
    age:40,
    // arr: [1, 2, { 3:{like:'dj'}, 4:'ai'}, 5],
    like:{
        dog:{
            color:'black',
            age:3,
        },
        cat:{
            color:'white',
            age:2
        }
    }
}
function copy(src){
    let dest;
    // 实现拷贝代码，将 src 的值完整地拷贝给 dest
    // 在这里实现
        dest = src.constructor === Array?[]:{};
        for(let key in src) {
            if (src.hasOwnProperty(key)) {
                if (src[key] && typeof src[key] === 'object') {
                    dest[key] = src[key].constructor === Array?[]:{};
                    dest[key] = copy(src[key]);
                } else {
                    dest[key] = src[key];
                }
            }
        }
    return dest
}
let jack2 = copy(jack)
 
// 比如修改 jack2 中的内容，不会影响到 jack 中的值

jack2.like.dog.color = 'green'
console.log(jack2)
console.log(jack.like.dog.color) // 打印出来的应该是 "black"
