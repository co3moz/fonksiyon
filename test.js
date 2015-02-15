var fonksiyon = require(__dirname  + "/libs/fonksiyon.js");

function Person(name, surname) {
	this.getName = function() { return name; }
	this.getSurname = function() { return surname; }
}

var Print = fonksiyon({
	null: function() {
		return "nope";
	},
	"Person": function(person) {
		return person.getName() + " " + person.getSurname();
	},
	"string, *string": function(name, surname) {
		return name + " " + surname;
	},
	"Person, number": function(person, number) {
		return number + " times " + person.getName();
	},
	"Person, any": function(person, unknown) {
		return "second parameter is any";
	}
}, function() {
	return "What did you say?";
});

var furkan = new Person("Furkan", "Başaran");

var testIt = function(k, s) {
	var r = eval(k);
	if(r != s) {
		console.log("FAILED!!!\n" + k + "\nEXPECTED:" + s + "\nRETURNED:" + r);
	}
}

testIt('Print(furkan)', "Furkan Başaran");
testIt('Print(furkan,furkan,furkan)', "What did you say?");
testIt('Print(furkan,furkan)', "second parameter is any");
testIt('Print("Doğan", "Derya")', "Doğan Derya");
testIt('Print(furkan, 5)', "5 times Furkan");
testIt('Print(furkan, "yello")', "second parameter is any");
testIt('Print()', "nope");
console.log("TEST FINISHED!");