
function NewObject () {
    var obj = new Object();
    Constructor = [].shift.call(arguments); // this 指向 user  j借用

    // console.log(Constructor);   // [Function: user]

    obj.__proto__ = Constructor.prototype;
    var result =Constructor.apply(obj, arguments);  // 借用外部传入的构造器给obj设置属性
    return typeof result === 'object' ? result : obj; // 确保返回的时一个对象
}

function user(name, sex, age) {
    this.name = name;
    this.sex = sex;
    this.age = age;
}

var person = NewObject(user, 'Dgjtfgh', '男', 18);
console.log(person.name)