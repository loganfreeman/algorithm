function Stack(){
	var array = [];
	var t = this;
	
	t.push = function(val){
		t.array.push(val);
		return t;
	}
	
	t.pop = function(){
		if (t.isEmpty())
			throw 'Stack empty';
		return t.array.pop();
	}
	
	t.isEmpty = function(){
		return array.length == 0;
	}
}

var s = new Stack();
s.push(1).push(2).push(3).push(4).push(5).push(6);


