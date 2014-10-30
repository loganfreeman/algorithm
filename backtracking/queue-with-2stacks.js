/*
	Author: Sy Le
	http://synle.com
	
	Implement a queue with 2 stacks.
	
	Sample example:
	Enqueue 10
	Enqueue 9
	Enqueue 8
	Enqueue 7
	Enqueue 6
	Enqueue 5
	Enqueue 4
	Enqueue 3
	Enqueue 2
	Enqueue 1

	Done init

	Dequeue 10
	Dequeue 9
	Dequeue 8
	Dequeue 7
	Dequeue 6
	Dequeue 5
	Dequeue 4
	Dequeue 3
	Dequeue 2

*/

var Stack = require ('./datastructure.js').Stack;

function Queue2Stacks(){
	var t = this;
	var stInbox = new Stack();
	var stOutbox = new Stack();
	
	/*
		enqueue is push into the inbox
	*/
	t.enqueue = function (val){
		stInbox.push(val);
	}
	
	/*
		dequeue is pop from outbox, if outbox is empty, then fill it up with inbox
	*/
	t.dequeue = function (){
		if (t.isEmpty())
			throw ('Queue is empty');	
		else if (stOutbox.isEmpty()){
			while (!stInbox.isEmpty()){
				var inboxVal = stInbox.pop();
				stOutbox.push(inboxVal);
			}
		}
		
		return stOutbox.pop();
	}
	
	t.isEmpty = function(){
		return stInbox.isEmpty() && stOutbox.isEmpty();
	}
}


//sample run
var queue = new Queue2Stacks();
for (var i = 10; i >= 1; i--){
	console.log('Enqueue', i);
	queue.enqueue(i);
}

console.log('\nDone init\n');

console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());