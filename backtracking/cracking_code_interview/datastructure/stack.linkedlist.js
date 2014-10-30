function LinkedList(){
	var t = this;
	t.val = null;
	t.next = null;
	
	t.printAll = function(){
		console.log(t.val);
		if (t.next != null)
			t.next.printAll();
		return '';
	}
}


function LinkedListStack (){
	var t = this;
	var top = null;//init stack is empty
	
	t.push = function (val){
		var newTop = new LinkedList();
		newTop.val = val;
		newTop.next = top;
		
		top = newTop;
		
		return t;
	}
	
	t.pop = function (){
		if (t.isEmpty())
			throw 'stack is empty';
			
		var val = top.val;		
		top = top.next;//move on to the next		
		return val;
	}
	
	t.isEmpty = function (){
		return top == null;
	}
	
	t.top = top;
}


var s = new LinkedListStack();
s.push(1).push(2).push(3).push(4).push(5).push(6);
