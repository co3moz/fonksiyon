var func = /function (.+) *\(/;
var nullable = /\*([^,]+)/g
var number = (1).constructor;
var string = ("1").constructor
var array =  ([]).constructor;
var object = ({}).constructor;
var function_ = Function.constructor;


function type(obj) {
	if(obj === null) return "null";
	if(obj === undefined) return "null";
	if(obj.constructor == number) return "number";
	if(obj.constructor == string) return "string";
	if(obj.constructor == array) return "array";
	if(obj.constructor == object) return "object";
	if(obj.constructor == function_) return "function";
	var temp = func.exec(obj.constructor)[1];
	if(temp) return temp;
	return "null";
}

module.exports = function(pork, d, c) {
	d || (d = function() {throw Error("Unknown function parameter");});
	c || (c = ',');
	pork || (pork = {});

	for(var p in pork) {
		var temp = p.replace(/ |\t/g, "");
		if(temp != p) {
			pork[temp] = pork[p];
			delete pork[p];
		}
	}

	for(var p in pork) {
		var temp;
		while(temp = nullable.exec(p)) {
			var calc = p.replace(temp[0],"");
			if(calc.charAt(calc.length - 1) == ',') {
				calc = calc.substring(0, calc.length-1);
			}
			pork[calc] = pork[p];
			pork[p.replace(/\*/g, "")] = pork[p];

			delete pork[p];
		}
	}

	var regList = {};
	for(var p in pork) {
		regList[p] = new RegExp("^" + p.replace(/any/g, "[^,]+") + "$");
	}

	return function() {
		var k = null;
		for(i in arguments) {
			if(k == null) {
				k = type(arguments[i]);
			} else {
				k += c + type(arguments[i]);
			}
			
		}
		if(pork[k]) return pork[k].apply(this, arguments);
		for(var p in pork) {
			if(regList[p].test(k)) {
				return pork[p].apply(this, arguments);
			}
		}
		return d.apply(this, arguments);
	}
}

module.exports.type = type;