// 'use strict'
var name = 'window';
var doSth = function(){
    // console.log(typeof this === 'undefined');
    console.log(this.name);
}
var student = {
    name: 'student',
    doSth: doSth,
    other: {
        name: 'other',
        doSth: doSth,
    }
}

doSth();         // undefined
student.doSth(); // student
student.other.doSth(); // other
// 用call类比则为：
student.doSth.call(student);  // student
// 用call类比则为：
// student.other.doSth.call(other); // 报错  other is not defined


function Student(name){
    this.name = name;
    // return function f(){};
    // return {};
}
var result = new Student('my');
console.log(result); // Student { name: 'my' }