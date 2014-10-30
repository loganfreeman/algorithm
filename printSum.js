/**
 * 
 * Given a target number, and a series of candidate numbers, print out all
 * combinations, so that the sum of candidate numbers equals to the target.
 * 
 * Here order is not important, so don’t print the duplicated combination. To
 * search for all combination, we use a backtracking algorithm. Here, we use the
 * above example of candidate={2,3,6,7} and target=7.
 * 
 */
function printSum(candidates, index) {
	var s = "";
	for ( var i = 0; i < index.length; i++) {
		s += ("" + candidates[index[i]] + ((i == (index.length - 1)) ? "" : "+"));
	}
	console.log(s);
}

function _solve(target, sum, candidates, sz, index, n) {
	if (sum > target)
		return;
	if (sum === target)
		printSum(candidates, index);

	for ( var i = 0; i < sz; i++) {
		var used = false;
		for ( var j = 0; j < index.length; j++) {
			if (index[j] === i) {
				used = true;
				break;
			}
		}
		if(used) continue;
		index[n] = i;
		var _sum = sum + candidates[index[n]];
		_solve(target, _sum, candidates, sz, index.slice(), n + 1);
	}
}

function _solve2(target, sum, candidates, sz, index, n) {

	

	var _sum = sum + candidates[index[n]];
	
	if (_sum > target)
		return;
	if (_sum === target)
		printSum(candidates, index);

	for ( var i = index[n] + 1; i < sz; i++) {
		
		index[n + 1] = i;

		_solve2(target, _sum, candidates, sz, index.slice(), n + 1);
	}
}


function solve(target, candidates, sz) {
	var index;
	for(var i = 0; i< candidates.length; i++){
		 index = [];
		 index[0] = i;
		_solve2(target, 0, candidates, sz, index, 0);
	}
}

solve(10, [ 10, 1, 2, 7, 6, 3, 5 ], 7);