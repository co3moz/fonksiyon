# Fonksiyon
Simplest Function Overloading

### How can i install?
	npm install fonksiyon

### Pros
* Fast
* Small
* YES Optional parameters.. 

### Cons
* No Grouped parameters (it will come soon. string, [number, string])
* No continous parameters (it will come soon. string, number...)

We are working for the cons..

### Supported Types
* string
* number
* array
* object
* function
* null or undefined (represented as null)
* any (represented as can get any param)
* own classes

### How can i use this 
```javascript
var fonksiyon = require("fonksiyon");
var sayhello = fonksiyon({
	"string": function (who) {
		console.log("Hello " + who);
	}, 
	"string, string": function(guy, guy2) {
		console.log("Welcome back " + guy + " and " + guy2 + " :)");
	}
});

sayhello("furkan");
sayhello("fatma", "kadir")
```
Console output;
```console
Hello furkan
Welcome back fatma and kadir :)
```

### More?
```javascript
var fonksiyon = require("fonksiyon");


function Person(name) {
	this.name = name;
}
/*
                             _________________________________
                            |   you must put name to function |
                            |_________________________________|
                            |
                            v
var person = new function Person(name) {
*/

var sayhello = fonksiyon({
	"Person": function(person) {
		console.log("Hello " + person.name);
	}, 
	"string": function (who) {
		console.log("Hello " + who);
	}, 
	"string, string": function(guy, guy2) {
		console.log("Welcome back " + guy + " and " + guy2 + " :)");
	}, 
	"Person, Person": function(guy, guy2) {
		console.log("Welcome back " + guy.name + " and " + guy2.name + " :)");
	}
});

var me = new Person("dogan");
var him = new Person("some guy");
sayHello(me, him);
```

### Optional parameters
use * statement for making optional parameter
```javascript
var opt = fonksiyon({
	"string, *number": function(str, num) {
		console.log(str, num);
	}
});
```

### Empty parameters
use null statement for making empty parameter
```javascript
var emptyparam = fonksiyon({
	null: function() {
		//no param
	}
});
```

### Any parameters
use any statement for allow all parameters
```javascript
var anyparam = fonksiyon({
	"string, any": function(str, something) {
		
	}
});
```