// var bar = {
//     myName: "time.geekbang.com",
//     printName: function () {
//         console.log(this.myName)
//     }
// }
// function foo() {
//     let myName = " 极客时间 "
//     return bar.printName
// }
// let myName = " 极客邦 "
// let _printName = foo()
// _printName()   // undefined
// bar.printName()  // time.geekbang.com


// function foo() {
//     console.log(this)
// }
// foo()

let userInfo = {
    name: "jack.ma",
    age: 13,
    sex: 'male',
    updateInfo: function () {
        // 模拟 xmlhttprequest 请求延时
        // setTimeout(function () {
        //     this.name = "pony.ma"
        //     this.age = 39
        //     this.sex = 'female'
        // }, 100)
        let that = this;
        setTimeout(function () {
            that.name = "pony.ma"
            that.age = 39
            that.sex = 'female'
        }, 100)
    }
}

userInfo.updateInfo()
setTimeout(function () {
    console.log(userInfo.name, userInfo.age, userInfo.sex, '+++');
}, 200)
console.log(userInfo.name, userInfo.age, userInfo.sex);