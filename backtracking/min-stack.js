/*
	author: Sy Le
	http://synle.com
	
	Min Stack is a regular stack with an additional method called getMin which allow you to grab the minimum in the current stack.
	
	The following implementation used two stacks approach. A real stack that stores the values and a min stack whose top will yeild to the minimum value on the stack.
	
	Sample data:
	The Stack [ 5, 10, 3, 6, 9, 1 ]
	Min Val 1

	Pop 1
	The Stack [ 5, 10, 3, 6, 9 ]
	Min Val 3

	Pop 9
	The Stack [ 5, 10, 3, 6 ]
	Min Val 3

	Pop 6
	The Stack [ 5, 10, 3 ]
	Min Val 3

	Pop 3
	The Stack [ 5, 10 ]
	Min Val 5
*/

var Stack = require ('./datastructure.js').Stack;

function MinStack(){
	var t = this;
	var stReal = new Stack();
	var stMin = new Stack();
	var curMin = 99999999999999999;//current min , init to be very high number
	
	t.push = function (val){
		if (curMin > val)
			curMin = val;//set current min if curMin is more than val
			
		stMin.push(curMin);
		stReal.push(val);
	}
	
	t.pop = function(){
		var ret = stReal.pop();
		stMin.pop();
		
		return ret;
	}
	
	t.peek = function(){
		return stReal.peek();
	}
	
	t.getMin = function (){
		if (stMin.isEmpty())
			throw('Stack is empty');
		else{
			return stMin.peek();
		}
	}
	
	t.serialize = function(){
		return stReal.serialize();
	}
}




//sample run
var minStack = new MinStack();
console.log('push 5');
minStack.push(5);
console.log('push 10');
minStack.push(10);
console.log('push 3');
minStack.push(3);
console.log('push 6');
minStack.push(6);
console.log('push 9');
minStack.push(9);
console.log('push 1');
minStack.push(1);

console.log('\nDone init\n');
console.log('The Stack', minStack.serialize());
console.log('Min Val', minStack.getMin());

console.log('\nPop', minStack.pop());
console.log('The Stack', minStack.serialize());
console.log('Min Val', minStack.getMin());


console.log('\nPop', minStack.pop());
console.log('The Stack', minStack.serialize());
console.log('Min Val', minStack.getMin());


console.log('\nPop', minStack.pop());
console.log('The Stack', minStack.serialize());
console.log('Min Val', minStack.getMin());

console.log('\nPop', minStack.pop());
console.log('The Stack', minStack.serialize());
console.log('Min Val', minStack.getMin());