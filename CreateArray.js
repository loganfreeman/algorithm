function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

function cloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(typeof(obj[i])=="object" && obj[i] != null)
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}

//extends 'from' object with members from 'to'. If 'to' is null, a deep clone of 'from' is returned
function extend(from, to)
{
    if (from == null || typeof from != "object") return from;
    if (from.constructor != Object && from.constructor != Array) return from;
    if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
        from.constructor == String || from.constructor == Number || from.constructor == Boolean)
        return new from.constructor(from);

    to = to || new from.constructor();

    for (var name in from)
    {
        to[name] = typeof to[name] == "undefined" ? extend(from[name], null) : to[name];
    }

    return to;
}

var obj =
{
    date: new Date(),
    func: function(q) { return 1 + q; },
    num: 123,
    text: "asdasd",
    array: [1, "asd"],
    regex: new RegExp(/aaa/i),
    subobj:
    {
        num: 234,
        text: "asdsaD"
    }
}

var clone = extend(obj);

obj.subobj.text = "changed";

//console.log(clone.subobj.text);

function createArray(length) {
	var arr = new Array(length || 0), i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while (i--)
			arr[length - 1 - i] = createArray.apply(this, args);
	}

	return arr;
}

function Create2DArray(rows) {
	var arr = [];

	for (var i = 0; i < rows; i++) {
		arr[i] = [];
	}

	return arr;
}

function matrix(rows, cols, defaultValue) {

	var arr = [];

	// Creates all lines:
	for (var i = 0; i < rows; i++) {

		// Creates an empty line
		arr.push([]);

		// Adds cols to the empty line:
		arr[i].push(new Array(cols));

		for (var j = 0; j < cols; j++) {
			// Initializes:
			arr[i][j] = extend(defaultValue);
		}
	}

	return arr;
}

var a = createArray(3, 2);
a[2][1] = 3;

var b = matrix(10,10, {});
b[5][5].path = 0;
//console.log(b[5][5].path);

module.exports = {
	createArray : createArray,
	Create2DArray : Create2DArray,
	createMatrix : matrix
};