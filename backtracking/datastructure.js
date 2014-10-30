/*
	simple stack implentation using javascript array
*/
exports.Stack = function (){
	var t = this;
	var arr = [];//this array store values of the stack
	
	t.push = function (val){
		arr.push(val);
	}
	
	t.pop = function(){
		if (t.isEmpty())
			throw('Stack is empty, pop is not allowed');
		else
			return arr.pop();
	}
	
	//get the top without popping it up
	t.peek = function (){
		if (t.isEmpty())
			throw('Stack is empty, peek is not allowed');
		else
			return arr[arr.length - 1];
	}
	
	t.isEmpty = function(){
		return arr.length <= 0;
	}
	
	
	t.serialize = function(){
		return arr;
	}
}


/*
	simple heap	implemented using array
*/
exports.Heap = function (mode, compareFunc){
	if (typeof mode == 'undefined') throw ('Constructor failed, please specify the heap mode : min heap or max heap');
	
	var t = this;
	var arr = [];//store the heap
	
	var lg = function(num){
		return Math.log(num) / Math.log(2) ;
	}
	
	var getParent = function(idx){
		//return arr[];
		return Math.floor((idx - 1) / 2);
	}
	
	var getChildren = function(idx){
		return [2 * idx + 1, 2 * idx + 2];
	}
	
	t.mode = mode;
	
	if (typeof compareFunc == 'undefined')
		t.compare = mode.toLowerCase() == 'max' ? function(a, b){return a > b} :  function(a,b){return a < b;};
	else
		t.compare = compareFunc;
	
	
	t.swap = function(a, b){
		var tmp = arr[a];
		arr[a] = arr[b];
		arr[b] = tmp;
	}
	
	
	t.add = function(val){
		var n = arr.length;
		var parent = getParent(n);
		
		//push it on to the array
		arr.push(val);
		
		//swap if not good
		while (n > 0 && t.compare(arr[n], arr[parent])){
			//swap itself with its parent
			t.swap(n, parent);			
						
			//move one level up
			n = parent;
			parent = getParent(n);
		}
	}
	
	t.addList = function (inputArr){
		for (var i = 0; i < inputArr.length; i++)
			t.add(inputArr[i]);
	}
	
	t.getRoot = function (){
		return arr[0];
	}
	
	
	/*get an object at idx*/
	t.get = function(idx){
		return arr[idx];
	}
	
	t.removeRoot = function(){
		//better approach instead of adding everything
		var ret = arr.shift();		
		var last = arr.pop();
		
		arr.unshift(last);//replace root wiht the last elem.
		
		//doing the swap until things are looking good.
		var n = 0;
		var children = getChildren(n);
		
		while (children.length > 0 && children[0] < arr.length){
			//get the current node
			var curVal = arr[n];
			
			//get its children
			var leftChild = arr[children[0]];
			var rightChild = arr[children[1]];
			
			//check to see if the binary heap is valid
			if (typeof rightChild != 'undefined'){
				//2 children nodes
				if (t.compare(curVal, leftChild) && t.compare(curVal, rightChild))
					break;
			}
			else{
				//1 child node
				if (t.compare(curVal, leftChild))
					break;
			}
			
			
			//pick a larger child if there is 2 child
			if (typeof rightChild != 'undefined' && t.compare(rightChild, leftChild)){
				t.swap(n,children[1]);
				n = children[1];
			}
			else{
				t.swap(n,children[0]);
				n = children[0];
			}
			
			children = getChildren(n);
		}
		
		return ret;
	}
	
	t.isEmpty = function(){
		return arr.length == 0;
	}
	
	t.serialize  = function(){return arr;}
}