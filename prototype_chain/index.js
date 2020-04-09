function Person() {

}
var person = new Person();
var person1 = new Person();
var person2 = new Person();
person.name = 'Kevin';
console.log(person.name);  // Kevin
console.log(person1.name); // undefined
Person.prototype.name = 'Dgjtfgh';
console.log(person.name);  // Kevin
console.log(person1.name); // Dgjtfgh
console.log(person2.name); // Dgjtfgh
console.log(Person.prototype); // Person { name: 'Dgjtfgh' }
delete person.name;       
console.log(person.name);  // Dgjtfgh
console.log(person.__proto__); // Person { name: 'Dgjtfgh' }
console.log(Person.prototype.__proto__); // {}