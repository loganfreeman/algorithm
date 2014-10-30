//base class used to d otesting
var TestHandler = require("./test_handler.js");

/*
given a and b are sorted array with a is big enough to contain b,
merge b into a
 */
function mergeSortedArray(a, b) {
	var curA = a.length - 1;
	var curB = b.length - 1;

	//attempt to add memory to a to hold b
	//only for demonstration purposes
	for (var i = 0; i <= curB; i++)
		a.push("");

	//merge a and b from the back of the array
	var cur = a.length - 1;
	while (cur >= 0) {
		var toPush;

		if (curA < 0) {
			//do b instead of a
			toPush = b[curB];
			curB--;
		} else if (curB < 0) {
			//do a instead of b
			toPush = a[curA];
			curA--;
		} else if (a[curA] >= b[curB]) {
			toPush = a[curA];
			curA--;
		} else {
			toPush = b[curB];
			curB--;
		}

		//push to array
		a[cur] = toPush;
		cur--;
	}

	return a;
}

var testMergeSortedArray = new TestHandler({
		name : 'mergeSortedArray',
		test : function (a, b) {
			var res;
			console.log('input', a, b);
			res = mergeSortedArray(a, b);
			console.log('output', res);
			console.log("");
		},
		inputs : [
			[[1, 5, 10, 29, 37], [2, 7, 9, 15]],
			[[1, 2, 3, 4], [5, 6, 7, 8]],
			[[1, 2, 3, 4, 5], []],
			[[], [1, 2, 3, 4, 5]]
		]
	});
//testMergeSortedArray.run();


/*
sort anagrams so that anagrams are next to each other
 */
function sortAnagram(array) {
	console.log(array);
	return array.sort(function (a, b) {
		//sort all the char in a,
		var asplit = a.split('').sort();

		//sort all the char in b,
		var bsplit = b.split('').sort();

		//then compare the too
		return asplit.join('') === bsplit.join('') ? 0 : 1;
	});
}

var testSortAnagram = new TestHandler({
		name : 'sortAnagram',
		test : function (array) {
			console.log('input', array);
			console.log('output', sortAnagram(array));
			console.log();
		},
		inputs : [
			[['looped', 'tab', 'act', 'bat', 'cat', 'arm', 'poodle', 'wolf', 'ram', 'flow']],
			[['mary', 'god', 'army', 'dog']]
		]
	});
//testSortAnagram.run();


/*
	given sorted-and-rotated array, and a target, find the index of target
	assume no duplicate in the array

	to call use
	searchInRotatedSortedArray(array, target to search);
*/
function searchInRotatedSortedArray(a, target, l, h){
	//get index for low, mid and high
	l = l || 0;
	h = h || a.length - 1;
	var m = Math.floor((l + h) / 2);

	//check against target is in the left half or right half.
	if (target < a[m]){
		//in left half
		return searchInRotatedSortedArray(a, target, l, m -1);
	}
	else if (target > a[m]){
		//in right half
		return searchInRotatedSortedArray(a, target, m + 1, h);
	}
	else{
		//equal, then we found it,
		return m;
	}
}




var testSearchInRotatedSortedArray = new TestHandler({
		name : 'sortAnagram',
		test : function (array, target) {
			console.log('array: ', array);
			console.log('target: ', target);
			console.log('result: ', searchInRotatedSortedArray(array, 5));
		},
		inputs : [
			[[15, 16, 19,20,25,1,33,4,5,7,10,14], 5]
		]
	});
//testSearchInRotatedSortedArray.run();




/*
	given a list of height and weight, maximize tower height
	note that top must be lighter and shorter than bottom.
	a = {h:,w}
*/
function solveTower(array){
	//first of all sort the array based on height and then weight
	array.sort(function(a, b){
		var h = a.h - b.h;
		if (h === 0){
			return a.w - b.w;
		}
		else{
			return h;
		}
	});


	//doing the max
	var max_seq = [];
	var cur_seq = [];	
	var i = 0;
	while (i < array.length){
		var to_push = false;

		if (cur_seq.length == 0){
			to_push = true;
		}
		else if (i < array.length - 1){
			if (array[i].w < array[i+1].w &&
				array[i].h < array[i+1].h){
				to_push = true;
			}
		}

		
		if (to_push){
			i++;
			cur_seq.push(array[i]);
		}
		else{
			//mark cur as unfit and start over from there
			if (cur_seq.length > max_seq.length){
				max_seq = cur_seq;
			}

			//start over
			cur_seq = [];
		}

	}

	console.log(array);
	console.log(max_seq);

	return max_seq;
}


solveTower([
{h: 2, w: 100},
{h: 2, w: 95},
{h: 1, w: 201},
{h: 130, w : 253}
	]);