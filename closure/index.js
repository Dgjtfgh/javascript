
var User = (function() {
    var userid, username, usersex, BirthDay;
    return function(id, name, sex, birthday) {
        // 返回新的对象 构造函数的使用
        // 1. 闭包 构造函数可以一直引用私有
        userid = id;
        username = name;
        usersex = sex
        BirthDay = birthday;
        function getage () {
            // let time = new Date();
            // return time - birthday;
        }
        return { // 公有的属性方法  public
            getUserId: function() {
                return userid;
            },
            getUserName: function() {
                return username;
            },
            getUserSex: function() {
                return usersex;
            },
            getBirthDay: function() {
                return BirthDay;
            }
        }
    }
})();

var K = new User(2, 'lidj', '男', '356789876543');
console.log(K.userid);         // undefined
console.log(K.getUserId());    // 2
console.log(K.getUserName());  // lidj
console.log(K.getUserSex());   // 男
console.log(K.getBirthDay());  // 356789876543

// var data = [];
// for (var i = 0; i < 3; i++) {
//   data[i] = function () {
//     console.log(i);
//   };
// }

// data[0]();  // 3
// data[1]();  // 3
// data[2]();  // 3

// var data = [];
// for (var i = 0; i < 3; i++) {
//   data[i] = (function (i) {
//         return function(){
//             console.log(i);
//         }
//   })(i);
// }

// data[0]();  // 0
// data[1]();  // 1
// data[2]();  // 2