var object_create = function (obj) {
    if (typeof obj !== "object" && typeof obj !== "function") {
        throw new TypeError("Object prototype may only be an Object: " + proto);
    }
    var args = [].slice.call(arguments, 1);
    for(let i of args){
		Object.assign(obj,i)
	}
    var func = function() {}
    func.prototype = obj;
    return new func(args);
}

var person = {
	age:18,
	friend:['gray','amili','adward']
}
var instance1 = object_create(person);
console.log(instance1.age);
// var instance2 = Object.create(person);
// console.log(instance2.age);