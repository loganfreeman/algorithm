/**
 * 
 * When shifting, it is reasonable to expect that a prefix v of the pattern matches some suffix of the portion u of the text. Moreover, if we want to avoid another immediate mismatch, the character following the prefix v in the pattern must be different from a. The longest such prefix v is called the tagged border of u (it occurs at both ends of u followed by different characters in x).
 * @param x
 * @param m
 * @param mpNext
 */
function preProcess(x, m, mpNext) {
	var i, j;

	i = 0;
	j = mpNext[0] = -1;
	while (i < m) {
		while (j > -1 && x[i] != x[j])
			j = mpNext[j];
		i++;
		j++;
		if (x[i] == x[j])
			mpNext[i] = mpNext[j];
		else
			mpNext[i] = j;
	}
}
function KMP(pattern, text) {

	var mpNext = [];
	var i, j, m;
	preProcess(pattern, pattern.length, mpNext);
	i = 0, j = 0;
	m = pattern.length;
	while (j < text.length) {
		while (i > -1 && pattern[i] != text[j])
			i = mpNext[i];
		i++;
		j++;
		if (i >= m) {
			console.log(j - i);
			i = mpNext[i];
		}
	}

}

// MP("ABABCD", "ABCABCDABABCDABCDABDE");

var txt = "BAABAACAADAABAAABAABAABAADFFSBAABAADSSSSSSSSSSSSSSDDSFFBAABASDDBAABAASFDSFBAABAASSDDBAABA";
var pat = "BAABA";

KMP(pat, txt);
module.exports = KMP;