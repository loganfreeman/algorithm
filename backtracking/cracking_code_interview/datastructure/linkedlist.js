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

module.exports = LinkedList;