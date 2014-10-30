var bubbleSort = require("./bubble-sort.js");
/**
 * Given two sorted arrays A, B of size m and n respectively. Find the k-th
 * smallest element in the union of A and B. You can assume that there are no
 * duplicate elements.
 * 
 */
function findKthSmallest(A, m, B, n, k) {

	var i = Math.floor((m / (m + n)) * (k - 1));
	var j = (k - 1) - i;

	// invariant: i + j = k-1
	// Note: A[-1] = -INF and A[m] = +INF to maintain invariant
	var Ai_1 = ((i == 0) ? Number.MIN_VALUE : A[i - 1]);
	var Bj_1 = ((j == 0) ? Number.MIN_VALUE : B[j - 1]);
	var Ai = ((i == m) ? Number.MAX_VALUE : A[i]);
	var Bj = ((j == n) ? Number.MAX_VALUE : B[j]);

	if (Bj_1 < Ai && Ai < Bj)
		return Ai;
	else if (Ai_1 < Bj && Bj < Ai)
		return Bj;

	// if none of the cases above, then it is either:
	if (Ai < Bj)
		// exclude Ai and below portion
		// exclude Bj and above portion
		return findKthSmallest(A.slice(i + 1), m - i - 1, B.slice(0, j), j, k
				- i - 1);
	else
		/* Bj < Ai */
		// exclude Ai and above portion
		// exclude Bj and below portion
		return findKthSmallest(A.slice(0, i), i, B.slice(j + 1), n - j - 1, k
				- j - 1);
}

console.log(findKthSmallest([3, 9, 13, 18], 4, [2, 4, 6, 8, 10, 12], 6, 4));
var arr1 = [3, 9, 13, 18];
var arr2 = [2, 4, 6, 8, 10, 12];
var arr3 = arr1.concat(arr2);
console.log(bubbleSort(arr3).join(" "));