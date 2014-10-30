/*
	author : Sy Le
	http://synle.com
	
	
	http://www.geeksforgeeks.org/next-greater-element/
	Given an array, print the Next Greater Element (NGE) for every element. The Next greater Element for an element x is the first greater element on the right side of x in array. Elements for which no greater element exist, consider next greater element as -1.
*/

var Stack = require ('./datastructure.js').Stack;

function nextGreaterElem(arr){
	var st = new Stack();
	
	//Push the first element to stack.
	st.push(arr[0]);
	
	var next, elem;
	
	//start at 1 to end
	for (var i = 1; i < arr.length; i++){
		next = arr[i];
		
		if (!st.isEmpty()){
			elem = st.pop();
			
			while (elem < next){
				console.log(elem, ' -> ', next);
				
				if (st.isEmpty())
					break;
					
				elem = st.pop();
			}
			
			if (elem > next)
				st.push(elem);				
		}
		
		//at the end put it back to the queue
		st.push(next);
	}
	
	while (st.isEmpty()){
		console.log(st.pop(), ' -> ', -1);
	}
}

nextGreaterElem([13,7,6,12]);