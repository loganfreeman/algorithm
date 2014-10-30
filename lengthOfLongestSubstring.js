/*
 * 
 * Longest Substring Without Repeating Characters
 * 
 * When you have found a repeated character (let’s say at index j), it means that the current substring (excluding the repeated character of course) is a potential maximum, so update the maximum if necessary. It also means that the repeated character must have appeared before at an index i, where i is less than j.
 * Since you know that all substrings that start before or at index i would be less than your current maximum, you can safely start to look for the next substring with head which starts exactly at index i+1.
 */
function lengthOfLongestSubstring(s) {
	var n = s.length;
	var i = 0, j = 0;
	var maxLen = 0;
	var exist = new Array(256);
	var longestStart;
	while (j < n) {
		if (exist[s[j]]) {
			maxLen = Math.max(maxLen, j - i);
			if (maxLen == (j - i))
				longestStart = i;
			while (s[i] != s[j]) {
				exist[s[i]] = false;
				i++;
			}
			i++;
			j++;
		} else {
			exist[s[j]] = true;
			j++;
		}
	}
	maxLen = Math.max(maxLen, n - i);
	if (maxLen == (n - i))
		longestStart = i;
	return s.substring(longestStart, longestStart + maxLen);
}
console.log(lengthOfLongestSubstring("aexyzcludingtherepeatedcharacterofcourse"));