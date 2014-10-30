function Queens() {

	/***************************************************************************
	 * Return true if queen placement q[n] does not conflict with other queens
	 * q[0] through q[n-1]
	 **************************************************************************/
	function isConsistent(q, n) {
		for ( var i = 0; i < n; i++) {
			if (q[i] == q[n])
				return false; // same column
			if ((q[i] - q[n]) == (n - i))
				return false; // same major diagonal
			if ((q[n] - q[i]) == (n - i))
				return false; // same minor diagonal
		}
		return true;
	}

	/***************************************************************************
	 * Print out N-by-N placement of queens from permutation q in ASCII.
	 **************************************************************************/
	function printQueens(q) {
		var N = q.length;
		var ret = new Array();
		for ( var i = 0; i < N; i++) {
			for ( var j = 0; j < N; j++) {
				if (q[i] == j)
					ret[ret.length] = "Q ";
				else
					ret[ret.length] = "* ";
			}
			ret[ret.length] = "\n";
		}
		ret[ret.length] = "\n";
		console.log(ret.join(""));
	}

	/***************************************************************************
	 * Try all permutations using backtracking
	 **************************************************************************/
	function enumerate(N) {
		var a = new Array(N);
		_enumerate(a, 0);
	}

	function _enumerate(q, n) {
		var N = q.length;
		if (n == N)
			printQueens(q);
		else {
			for ( var i = 0; i < N; i++) {
				q[n] = i;
				if (isConsistent(q, n))
					_enumerate(q, n + 1);
			}
		}
	}
	
	return {enumerate: enumerate};

}


Queens().enumerate(8);
module.exports = Queens;