/* This function builds the TF table which represents Finite Automata for a
   given pattern  */


var search = function(pat, txt) {
	var M = pat.length;
	var N = txt.length;

	var TF = [];
	
	var NO_OF_CHARS = 256;
	
    var CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    var CHAR_ARR = CHAR_SET.split("");
    
	function getNextState(pat, M, state, x) {
		// If the character c is same as next character in pattern,
		// then simply increment state
		if (state < M && x === pat[state])
			return state + 1;

		var ns, i; // ns stores the result which is next state

		// ns finally contains the longest prefix which is also suffix
		// in "pat[0..state-1]c"

		// Start from the largest possible value and stop when you find
		// a prefix which is also suffix
		for (ns = state; ns > 0; ns--) {
			if (pat[ns - 1] === x) {
				for (i = 0; i < ns - 1; i++) {
					if (pat[i] != pat[state - ns + 1 + i])
						break;
				}
				if (i === ns - 1)
					return ns;
			}
		}

		return 0;
	}
	function computeTF(pat, M, TF) {
		var state, x;
		for (state = 0; state <= M; ++state) {
			TF[state] = [];
			for (x = 0; x < CHAR_ARR.length; ++x)
				TF[state][CHAR_SET[x]] = getNextState(pat, M, state, CHAR_SET[x]);
		}

	}

	computeTF(pat, M, TF);

	// Process txt over FA.
	var i, state = 0;
	for (i = 0; i < N; i++) {
		state = TF[state][txt[i]];
		if (state === M) {
			var _i = (i - M + 1);
			console.log(pat + " found at index " + _i);
			console.log(txt.substr(_i, M));
		}
	}
};

var txt = "BAABAACAADAABAAABAABAABAADFFSBAABAADSSSSSSSSSSSSSSDDSFFBAABASDDBAABAASFDSFBAABAASSDDBAABA";
var pat = "BAABA";
search(pat, txt);
module.exports = search;