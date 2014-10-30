var Queue = function (){
	var t = this;
	var array = [];	
	
	
	t.enqueue = function (val){
		array.push(val);
		
		return t;//for chain calling
	}
	
	t.dequeue = function (){
		if (t.isEmpty())
			throw 'queue is empty';
			
		return array.shift();
	}
	
	t.isEmpty = function (){
		return array.length == 0;
	}
}