# javascript原型链

function Person() {

}
var person = new Person();  使用new创建了一个实例对象
Person 相当于  person 的原型   一个构造函数
person.__proto__  ->  Person {}  __proto__ 实例指向原型
Person.prototype -》 Person {} 

person.name = 'Kevin';                 只在person实例上声明了name
Person.prototype.name = 'Dgjtfgh';     相当于C语言里的构造并给默认值
会觉得前者会覆盖后者   但是这么说又不对

执行 delete person.name;   person.name -》 Dgjtfgh
当删除了 person 的 name 属性时，读取 person.name，在 person 对象中找不到了，就会从 person 的原型也就是 person.__proto__ ，也就是 Person.prototype中查找  即 Person.prototype.name = 'Dgjtfgh'