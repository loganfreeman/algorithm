function QuickSort(array){
	if (array.length <= 1)
		return array;
	else
	{
		var pivot = parseInt(array.length / 2);
		var pivotVal = array[pivot];
		var less = [];
		var more = [];
		
		for (var i = 0; i < array.length; i++){
			var x = array[i];
			
			
			if (x <pivotVal){
				less.push(x);
			}
			else if (x > pivotVal){
				more.push(x);
			}
		}
		
		var newList = [];
		newList = newList.concat(QuickSort(less));
		newList.push(pivotVal);
		newList = newList.concat(QuickSort(more));
		
		
		return newList;
	}
}

var array = [99, 8,71,2,3,8712517, 4,5,6];
QuickSort(array);