/*
	author: Sy Le
	http://synle.com

	Given a list of numbers L, output a list of numbers where the value at index i is the product of all values in L, excluding the value at index i. Solve this without using division
	
	Example:
	Index       0    1    2    3   4
	Input  [    2,   4,   6,   8, 10 ]
	Output [ 1920, 960, 640, 480, 384 ]
	
	idx 0 : 1920 = 4 * 6 * 8 * 10 (2 is not included)
	idx 3 :  640 = 2 * 4 * 6 * 10 (8 is not included)	
*/

function prodArray(arr)
{
	var left = [];
	var right = [];
	var ret = [];
	
	for (var i = 0; i < arr.length; i++){
		//setup to make everything is 1
		left.push(1);
		right.push(1);		
	}
		
	//store the value of product from left to the right
	for (var i = 1; i < arr.length; i++){
		//setup left
		left[i] = left[i - 1] * arr[i - 1];
		
		//setup right
		var j = arr.length - i - 1;
		right[j] = right[j + 1] * arr[j + 1];
	}
	
	//prepare ret	
	for (var i = 0; i < arr.length; i++){
		ret[i] = left[i] * right[i];
	}	
	
	return ret;
}


//sample run
var arr;
arr = [2,4,6,8,10];
console.log('Input', arr);
console.log('Output', prodArray(arr));



arr = [12,1,5,73,2,76,786,9,1,34,18,3,5];
console.log('Input', arr);
console.log('Output', prodArray(arr));