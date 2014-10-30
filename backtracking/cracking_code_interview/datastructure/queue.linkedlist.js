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


var Queue = function (){
	var t = this;
	
	var head = new LinkedList();
	var tail = head;
	
	
	t.enqueue = function (val){
		tail.next = new LinkedList();
		tail.val = val;
		tail = tail.next;
		
		return t;
	}
	
	t.dequeue = function (){
		if (t.isEmpty())
			throw 'queue is empty';
			
		var val = head.val;
		head = head.next;
		return val;
	}
	
	t.isEmpty = function (){
		return head == null || head.next == null;
	}
}

var q = new Queue();
q.enqueue(1).enqueue(2).enqueue(3).enqueue(4).enqueue(5).enqueue(6);
