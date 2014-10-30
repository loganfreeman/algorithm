/*
	author: Sy Le
	synle@synle.com
	
	Find the nth most frequent number in the array.
	
	This approach use a max heap to return the n account.
	The complexity of the function below is O(n).
	
	Example:
	Input:
		arr [ 5, 6, 7, 7, 8, 10, 10, 2, 5, 6, 8, 5, 5, 5, 5, 6, 6, 6 ]
		k 3

  
	Output:
		[ { val: '5', count: 6 },
		  { val: '6', count: 5 },
		  { val: '7', count: 2 } ]
*/

var Heap = require ('./datastructure.js').Heap;

function FindMostFrequentNumber(arr, numberOfReturn){
	if (numberOfReturn <= 0) return [];
	
	var hashCount = {};//map val to count
	
	//get the count
	for (var i = 0; i < arr.length; i++){
		hashCount[arr[i]] = hashCount[arr[i]] || 0;
		hashCount[arr[i]]++;
	}
	
	//heapify, and reverse hash count
	var maxHeapFrequency = new Heap('max', function(a, b){
		//compare function
		if (arr.length > 1)
			return a.count > b.count;
		else
			return true;
	});
	
	for (var k in hashCount){
		if (typeof hashCount != 'undefined'){
			maxHeapFrequency.add({val: k, count : hashCount[k]});
		}
	}
	
	//prepare ret;
	var ret = [];
	
	while (numberOfReturn > 0){
		numberOfReturn--;
		ret.push(maxHeapFrequency.removeRoot());
		
		if (maxHeapFrequency.isEmpty())
			break;
	}
	
	return ret;
}

//sample run
var arr = [5,6,7,7,8,10,10,2,5,6,8, 5, 5, 5, 5, 6,6,6];
var k = 3;

console.log('Array', arr);
console.log('K', k);
console.log(FindMostFrequentNumber(arr, k));