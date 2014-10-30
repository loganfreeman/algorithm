function isMatch(str, pattern, idx) {
	for ( var i = 0; i < pattern.length; i++) {
		if (pattern[i] != str[idx + i])
			return false;
	}
	return true;
}

function replace(str, pattern, replacement) {
	if (str === null || pattern === null)
		return;
	var pSlow = 0, pFast = 0;
	var pLen = pattern.length;
	while (pFast < str.length) {
		var matched = false;
		while (isMatch(str, pattern, pFast)) {
			matched = true;
			pFast += pLen;
		}
		if (matched) {
			str = str.slice(0, pSlow) + replacement+ str.slice(pFast);
			pSlow = pFast = pSlow + replacement.length;
		} else {
			pFast++;
			pSlow++;
		}

	}
	console.log(str);
}

replace("aabbaabbaaabbbaabb", "aaabb", "X");

replace("abcdeffdfegabcaaaabcab", "abc", "X");

replace("aabaaabaab", "aaa", "X");