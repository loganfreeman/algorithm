//base class used to d otesting
var TestHandler = require("./test_handler.js");



function findMinInSortedRotatedArray(arr, low, high){
	if (typeof low == 'undefined')
		low = 0;

	if (typeof high == 'undefined')
		high = arr.length -1 ;

	var mid = Math.floor((low + high) / 2);

	var lowVal = arr[low];
	var highVal = arr[high];
	var midVal = arr[mid];

	if (high < low)
		return arr[0];

	if (low == high)
		return arr[low];

	if (midVal <= lowVal && midVal <= highVal)
		return midVal;

	if (highVal >  midVal)// 10, 2, *3*, 5, 6 
	{
		//low is greater than val, then the low is in left half
		//console.log('Left', lowVal, midVal, highVal);
		return findMinInSortedRotatedArray(arr, low, mid - 1);
	}		
	
	//console.log('Right', lowVal, midVal, highVal);
	return findMinInSortedRotatedArray(arr, mid + 1, high);
}


var testFindMinInSortedRotatedArray = new TestHandler({
	name : 'findMinInSortedRotatedArray',
	test : function (a) {
		var res;
		console.log('input', a);
		res = findMinInSortedRotatedArray(a);
		console.log('output', res);
		console.log("");
	},
	inputs : [
		[[1,2,3,4,5,6,7]],
		[[3, 4, 5, 1, 2]],
		[[5, 6, 7, 1, 2, 3, -4]],
		[[2, 3, 4, 5, 6, 7, 8, 1]]
	]
});
//testFindMinInSortedRotatedArray.run();


/*
	print all permutation

	Complexity : O(n^2)
	Space: O(n)
*/
function findPermutationRecursion(arr, res, cb){
	res = res || [];
	cb = cb || function(){console.log(arguments[0])}

	if (arr.length == 0)
		console.log(res);
	else{
		for (var i = 0; i < arr.length; i++){
			//create a new list with everything except currrent item
			var newArr = [];
			for (var j = 0; j < arr.length; j++)
				if (i != j)
					newArr.push(arr[j]);

			var curRes = res.slice();
			curRes[curRes.length] = arr[i];
			findPermutationRecursion(newArr, curRes, cb);
		}
	}
}



/*
	print all permutation

	Complexity : O(n * n!)
	Space: 1
*/
function findPermutationBacktrack(arr, from, cb){
	from = from || 0;
	cb = cb || function(){console.log(arguments[0])}

	var curArr = arr.slice();

	function swap(a, i, j){
		var tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}

	if (from == curArr.length - 1)
		console.log('res:', curArr);

	for (var i = from; i < curArr.length; i++){
		//swap from with current
		swap(arr, from, i);

		findPermutationBacktrack(arr, from + 1, cb);

		//backtracking
		swap(arr, from, i);
	}
}


var testFindPermutationRecursion = new TestHandler({
	name : 'findPermutationRecursion',
	test : function (str) {
		var arr = str.split('');
		console.log('input', arr);
		console.log('output');
		res = findPermutationRecursion(arr);
		console.log("");
	},
	inputs : [
		['ab'],
		['abc'],
		['abcd']
	]
});
testFindPermutationRecursion.run();

//findPermutationRecursion('abc'.split(''));
//findPermutationBacktrack('abc'.split(''));