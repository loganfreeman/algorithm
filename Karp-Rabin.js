/**
 * 
 * 
 * Rabin Karp algorithm
 * 
 * 
 * This is actually the "naive" approach augmented with a powerful programming
 * technique - the hash function.
 * 
 * Every string s[] of length m can be seen as a number H written in a
 * positional numeral system in base B (B >= size of the alphabet used in the
 * string):
 * 
 * H = s[0] * B(m - 1) + s[1] * B(m - 2) + … + s[m - 2] * B1 + s[m - 1] * B0
 * 
 * If we calculate the number H (the hash value) for the pattern and the same
 * number for every substring of length m of the text than the inner loop of the
 * "naive" method will disappear - instead of comparing two strings character by
 * character we will have just to compare two integers.
 * 
 * A problem arises when m and B are big enough and the number H becomes too
 * large to fit into the standard integer types.
 * 
 * A + B = C => (A % M + B % M) % M = C % M A * B = C => ((A % M) * (B % M)) % M =
 * C % M The drawback of using remainders is that it may turn out that two
 * different strings map to the same number (it is called a collision). This is
 * less likely to happen if M is sufficiently large and B and M are prime
 * numbers. We have to compare the "candidate" substring of the text with the
 * pattern character by character only when their hash values are equal.
 * 
 * H0 = Hs[0]…s[2] = s[0] * B2 + s[1] * B + s[2]
 * 
 * H1 = Hs[1]..s[3] = s[1] * B2 + s[2] * B + s[3]
 * 
 * H1 = (H0 - s[0] * B2 ) * B + s[3]
 * 
 * In general:
 * 
 * Hi = ( Hi - 1 - s[i- 1] * Bm - 1 ) * B + s[i + m - 1]
 * 
 */

var primerUntil = require("./listPrimes.js");

function RabinKarp(text, pattern) {

	// correctly calculates a mod b even if a < 0
	function int_mod(a, b) {
		return (a % b + b) % b;
	}
	var B = 256;

	var M = primerUntil.generatebigPrime(2 << 27, 2 << 28);
	// let n be the size of the text, m the size of the
	// pattern, B - the base of the numeral system,
	// and M - a big enough prime number

	var n = text.length, m = pattern.length;

	if (n < m)
		return; // no match is possible

	// calculate the hash value of the pattern
	var hp = 0;
	for ( var i = 0; i < m; i++)
		hp = int_mod(hp * B + pattern[i].charCodeAt(0), M);

	// calculate the hash value of the first segment
	// of the text of length m
	ht = 0;
	for (i = 0; i < m; i++)
		ht = int_mod(ht * B + text[i].charCodeAt(0), M);

	if (ht == hp) {
		// check character by character if the first
		// segment of the text matches the pattern
		var match = true;
		for (i = 0; i < m; i++) {
			if (text[i] != pattern[i]) {
				match = false;
				break;
			}
		}
		if (match) {
			console.log("found pattern at index: " + 0);
		}
	}

	// start the "rolling hash" - for every next character in
	// the text calculate the hash value of the new segment
	// of length m; E = (Bm-1) modulo M
	for (i = m; i < n; i++) {
		var E = Math.pow(B, m -1) % M;
		ht = int_mod(ht - int_mod(text[i - m].charCodeAt(0) * E, M), M);
		ht = int_mod(ht * B, M);
		ht = int_mod(ht + text[i].charCodeAt(0), M);

		if (ht == hp) {
			// check character by character if the
			// current segment of the text matches
			// the pattern
			var match = true;
			for (var j = 0; j < m; j++) {
				if (text[j + i - m + 1] != pattern[j]) {
					match = false;
					break;
				}
			}
			if (match) {
				console.log("found pattern at index: " + (i - m + 1));
			}
		}
		;
	}

}

//var txt = "BAABAACAADAABAAABAABAABAADFFSBAABAADSSSSSSSSSSSSSSDDSFFBAABASDDBAABAASFDSFBAABAASSDDBAABA";
//var pat = "BAABA";
//RabinKarp(txt, pat);
module.exports = RabinKarp;