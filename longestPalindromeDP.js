/*
Given a string S, find the longest palindromic substring in S
Define P[ i, j ] ← true iff the substring Si … Sj is a palindrome, otherwise false.
Therefore
P[ i, j ] ← ( P[ i+1, j-1 ] and Si = Sj )
The base cases are:
P[ i, i ] ← true
P[ i, i+1 ] ← ( Si = Si+1 )


 */

function longestPalindromeDP(s) {
	var n = s.length;
	var longestBegin = 0;
	var maxLen = 1;
	var table = new Array(n);
	for ( var i = 0; i < table.length; i++) {
		table[i] = new Array(n);
	}
	for (i = 0; i < n; i++) {
		table[i][i] = true; // P[i,i] = true
	}
	for (i = 0; i < n - 1; i++) {
		if (s[i] == s[i + 1]) {
			table[i][i + 1] = true;
			longestBegin = i;
			maxLen = 2;
		}
	}
	for ( var len = 3; len <= n; len++) {
		for ( var i = 0; i < n - len + 1; i++) {
			var j = i + len - 1;
			if (s[i] == s[j] && table[i + 1][j - 1]) {
				table[i][j] = true;
				if (len > maxLen) {
					longestBegin = i;
					maxLen = len;
				}

			}
		}
	}

	return s.substring(longestBegin, maxLen + longestBegin);
}



function expandAroundCenter(s, c1, c2) {
	var l = c1, r = c2;
	var n = s.length;
	while (l >= 0 && r <= n - 1 && s[l] == s[r]) {
		l--;
		r++;
	}
	return s.substring(l + 1, r);
}
//console.log(expandAroundCenter("abacdfggfdcabadcaba", 6, 7));

/*
 * 
 * 
 * A simpler approach, O(N2) time and O(1) space
 */
function longestPalindromeSimple(s) {
	var n = s.length;
	if (n == 0)
		return "";
	var longest = s.substring(0, 1); // a single char itself is a palindrome
	for ( var i = 0; i < n - 1; i++) {
		var p1 = expandAroundCenter(s, i, i);
		if (p1.length > longest.length)
			longest = p1;

		var p2 = expandAroundCenter(s, i, i + 1);
		if (p2.length > longest.length)
			longest = p2;
	}
	return longest;
}


/*
 * An O(N) Solution (Manacher’s Algorithm) First, we transform the input string,
 * S, to another string T by inserting a special character ‘#’ in between
 * letters For example: S = “abaaba”, T = “#a#b#a#a#b#a#”. To find the longest
 * palindromic substring, we need to expand around each Ti such that Ti-d … Ti+d
 * forms a palindrome. You should immediately see that d is the length of the
 * palindrome itself centered at Ti. We store intermediate result in an array P,
 * where P[ i ] equals to the length of the palindrome centers at Ti. The
 * longest palindromic substring would then be the maximum element in P. T = # a #
 * b # a # a # b # a # P = 0 1 0 3 0 1 6 1 0 3 0 1 0 Assume that we have arrived
 * at index i = 13, and we need to calculate P[ 13 ] (indicated by the question
 * mark ?). We first look at its mirrored index i’ around the palindrome’s
 * center C if P[ i' ] ≤ R – i, then P[ i ] ← P[ i' ] else P[ i ] ≥ P[ i' ].
 * (Which we have to expand past the right edge (R) to find P[ i ]. If the
 * palindrome centered at i does expand past R, we update C to i, (the center of
 * this new palindrome), and extend R to the new palindrome’s right edge. In
 * each step, there are two possibilities. If P[ i ] ≤ R – i, we set P[ i ] to
 * P[ i' ] which takes exactly one step. Otherwise we attempt to change the
 * palindrome’s center to i by expanding it starting at the right edge, R.
 * 
 */
// Transform S into T.
// For example, S = "abba", T = "^#a#b#b#a#$".
// ^ and $ signs are sentinels appended to each end to avoid bounds checking
function preProcess(s) {
	var n = s.length;
	if (n == 0)
		return "^$";
	var ret = "^";
	for ( var i = 0; i < n; i++)
		ret += "#" + s.substring(i, i+1);

	ret += "#$";
	return ret;
}
//console.log(preProcess("adc"));
function longestPalindrome(s) {
	var T = preProcess(s);
	var n = T.length;
	var P = new Array(n);
	var C = 0, R = 0;
	for ( var i = 1; i < n - 1; i++) {
		var i_mirror = 2 * C - i; // equals to i' = C - (i-C)

		P[i] = (R > i) ? Math.min(R - i, P[i_mirror]) : 0;

		// Attempt to expand palindrome centered at i
		while (T[i + 1 + P[i]] == T[i - 1 - P[i]])
			P[i]++;

		// If palindrome centered at i expand past R,
		// adjust center based on expanded palindrome.
		if (i + P[i] > R) {
			C = i;
			R = i + P[i];
		}
	}

	// Find the maximum element in P.
	var maxLen = 0;
	var centerIndex = 0;
	for ( var i = 1; i < n - 1; i++) {
		if (P[i] > maxLen) {
			maxLen = P[i];
			centerIndex = i;
		}
	}
	//console.log(P.join(""));
	//console.log(T.split("").join(""));
	return s.substring((centerIndex - 1 - maxLen) / 2, maxLen + (centerIndex - 1 - maxLen) / 2 );
}

console.log("longestPalindrome      :"
		+ longestPalindrome("abacdfggfdcabadcaba"));
console.log("longestPalindromeSimple:"
		+ longestPalindromeSimple("abacdfggfdcabadcaba"));
console.log("longestPalindromeDP:    "
		+ longestPalindromeDP("abacdfggfdcabadcaba"));

console.log("longestPalindrome      :"
		+ longestPalindrome("kkddllddddadfadfererearearearegjkkjkkk"));
console.log("longestPalindromeSimple:"
		+ longestPalindromeSimple("kkddllddddadfadfererearearearegjkkjkkk"));
console.log("longestPalindromeDP:    "
		+ longestPalindromeDP("kkddllddddadfadfererearearearegjkkjkkk"));
