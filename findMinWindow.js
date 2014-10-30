/**
 * 
 * Given a set T of characters and a string S, find the minimum window in S
 * which will contain all the characters in T in complexity O(n).
 * 
 * eg, S = “ADOBECODEBANC” T = “ABC”
 * 
 * Minimum window is “BANC”
 * 
 * How do we determine if a particular window contains T? (ideally in O(1) time)
 * How do we select all windows efficiently? (ideally do not include other
 * windows that wrap about a sub-window)
 */

// http://leetcode.com/2010/11/finding-minimum-window-in-s-which.html
var Queue = require("./Queue.js");
INT_MAX = 4294967295;
var findMinWindow = function(S, T) {

	var minWindowBegin, minWindowEnd;
	var sLen = S.length;
	var tLen = T.length;
	var needToFind = new Array(256);

	for ( var i = 0; i < tLen; i++) {
		if (!needToFind[T[i]])
			needToFind[T[i]] = 1;
		else
			needToFind[T[i]]++;
	}

	var hasFound = new Array(256);
	var minWindowLen = INT_MAX;
	var count = 0;
	for ( var begin = 0, end = 0; end < sLen; end++) {
		// skip characters not in T
		if (!needToFind[S[end]])
			continue;
		if (!hasFound[S[end]])
			hasFound[S[end]] = 1;
		else
			hasFound[S[end]]++;
		if (hasFound[S[end]] <= needToFind[S[end]])
			count++;

		// if window constraint is satisfied
		if (count === tLen) {

			// update minWindow if a minimum length is met
			var windowLen = end - begin + 1;
			if (windowLen < minWindowLen) {
				minWindowBegin = begin;
				minWindowEnd = end;
				minWindowLen = windowLen;
			} // end if
			while (!needToFind[S[begin]] || hasFound[S[begin]] > needToFind[S[begin]]) {
				if(hasFound[S[begin]] > needToFind[S[begin]]) hasFound[S[begin]]--;
				begin++;
			}
			hasFound[S[begin]]--; count--;begin++;
			while (!needToFind[S[begin]] || hasFound[S[begin]] > needToFind[S[begin]]) {
				if(hasFound[S[begin]] > needToFind[S[begin]]) hasFound[S[begin]]--;
				begin++;
			}

		} // end if

	} // end for

	return {
		from : minWindowBegin,
		to : minWindowEnd,
		len : minWindowLen
	};
}

var result = findMinWindow("ADOBECODEBANC", "ABC");
console.log("ADOBECODEBANC".substring(result.from, result.to+1)
		+ "\n" + result.len);
module.exports = findMinWindow;