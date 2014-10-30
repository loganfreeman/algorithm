var _stack = require("./stack.js");

var MinStack = function() {
	this.elements = new _stack();
	this.minStack = new _stack();
	this.push = function(x) {
		this.elements.push(x);
		if (this.minStack.empty() || x <= this.minStack.top())
			this.minStack.push(x);
	}
	this.pop = function() {

		if (this.elements.empty())
			return null;
		if (this.elements.top() == this.minStack.top())
			this.minStack.pop();
		return this.elements.pop();

	}
	this.min = function() {
		if (this.minStack.empty()) {
			return null;
		} else {
			return this.minStack.top();
		}
	}
	
	this.top = function(){
		return this.elements.top();
	}
};

var s = new MinStack();
s.push(45);
s.push(35);
s.push(24);
console.log(s.min());
s.push(67);
console.log(s.min());
console.log(s.top());
s.push(6);
console.log(s.min());

module.exports = MinStack;