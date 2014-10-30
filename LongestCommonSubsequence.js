// recursion
function lcs(a, b) {
	var aSub = a.substr(0, a.length - 1);
	var bSub = b.substr(0, b.length - 1);

	if (a.length == 0 || b.length == 0) {
		return "";
	} else if (a.charAt(a.length - 1) == b.charAt(b.length - 1)) {
		return lcs(aSub, bSub) + a.charAt(a.length - 1);
	} else {
		var x = lcs(a, bSub);
		var y = lcs(aSub, b);
		return (x.length > y.length) ? x : y;
	}
}

console.log(lcs('hello world', 'world is peaceful'));

// dynamic version
function dynamicLcs(x, y) {
	var s, i, j, m, n, lcs = [], row = [], c = [], left, diag, latch;
	// make sure shorter string is the column string
	if (m < n) {
		s = x;
		x = y;
		y = s;
	}
	m = x.length;
	n = y.length;
	// build the c-table
	for (j = 0; j < n; row[j++] = 0)
		;
	for (i = 0; i < m; i++) { // for each row ( the previous row actually)
		c[i] = row = row.slice(); // make a copy of the current row
		for (diag = 0, j = 0; j < n; j++, diag = latch) { // for each column
			latch = row[j];
			if (x[i] == y[j]) {
				row[j] = diag + 1; // (i-1, j-1) + 1
			} else { // either (i , j-1) or (i-1, j)
				left = row[j - 1] || 0; 
				if (left > row[j]) {
					row[j] = left;
				}
			}
		}
	}
	i--, j--;
	// row[j] now contains the length of the lcs
	// recover the lcs from the table
	while (i > -1 && j > -1) {
		switch (c[i][j]) {
		default:
			j--;
			lcs.unshift(x[i]);
		case (i && c[i - 1][j]):
			i--;
			continue;
		case (j && c[i][j - 1]):
			j--;
		}
	}
	return lcs.join('');
}

console.log(dynamicLcs('hello world', 'world is peaceful'));


function lcs_greedy(x,y){
	var symbols = {},
		r=0,p=0,p1,L=0,idx,
		m=x.length,n=y.length,
		S = new Buffer(m<n?n:m);
	p1 = popsym(0);
	for(i=0;i < m;i++){
		p = (r===p)?p1:popsym(i);
		p1 = popsym(i+1);
		idx=(p > p1)?(i++,p1):p;
		if(idx===n){p=popsym(i);}
		else{
			r=idx;
			S[L++]=x.charCodeAt(i);
		}
	}
	return S.toString('utf8',0,L);
 
	function popsym(index){
		var s = x[index],
			pos = symbols[s]+1;
		pos = y.indexOf(s,pos>r?pos:r);
		if(pos===-1){pos=n;}
		symbols[s]=pos;
		return pos;
	}
}

console.log(lcs_greedy('hello world', 'world is peaceful'));


function longestCommonSubstring(string1, string2){
	// init max value
	var longestCommonSubstring = 0;
	// init 2D array with 0
	var table = [],
            len1 = string1.length,
            len2 = string2.length,
            row, col;
	for(row = 0; row <= len1; row++){
		table[row] = [];
		for(col = 0; col <= len2; col++){
			table[row][col] = 0;
		}
	}
	// fill table
        var i, j;
	for(i = 0; i < len1; i++){
		for(j = 0; j < len2; j++){
			if(string1[i]==string2[j]){
				if(table[i][j] == 0){
					table[i+1][j+1] = 1;
				} else {
					table[i+1][j+1] = table[i][j] + 1;
				}
				if(table[i+1][j+1] > longestCommonSubstring){
					longestCommonSubstring = table[i+1][j+1];
				}
			} else {
				table[i+1][j+1] = table[i+1][j] > table[i][j+1]? table[i+1][j] : table[i][j+1];
			}
		}
	}
	
	var lcs = [];
	print2dDArray(table, i+1, j+1);
	while(i > 0 && j > 0){
		if(table[i][j] === table[i-1][j-1]+1) {
			lcs.unshift(string1[i-1]);
			i--, j--;
		}
		else if(table[i][j] === table[i][j-1]){
			j--;
		}else{
			i--;
		}
	}
	return lcs.join('');
}

function print2dDArray(a, m, n){
	var re = [];
	for(var i = 0; i < m; i++){
		
		var row = [];
		for(var j=0; j< n; j++){
			row.push(a[i][j]);
		}
		re.push(row.join(' '));

		re.push('\n');
	}
	console.log(re.join(''));
}

var util = require('./CreateArray.js');
print2dDArray(util.createMatrix(3,5, 'x'), 3, 5);
console.log(longestCommonSubstring('hello world', 'world is peaceful'));



function longestCommonSubstring2(str1, str2){
	if (!str1 || !str2)
		return {
			length: 0,
			sequence: "",
			offset: 0
		};
 
	var sequence = "",
		str1Length = str1.length,
		str2Length = str2.length,
		num = new Array(str1Length),
		maxlen = 0,
		lastSubsBegin = 0;
 
	for (var i = 0; i < str1Length; i++) {
		var subArray = new Array(str2Length);
		for (var j = 0; j < str2Length; j++)
			subArray[j] = 0;
		num[i] = subArray;
	}
 
	for (var i = 0; i < str1Length; i++)
	{
		for (var j = 0; j < str2Length; j++)
		{
			if (str1[i] !== str2[j])
				num[i][j] = 0;
			else
			{
				if ((i === 0) || (j === 0))
					num[i][j] = 1;
				else
					num[i][j] = 1 + num[i - 1][j - 1];
 
				if (num[i][j] > maxlen)
				{
					maxlen = num[i][j];
					var thisSubsBegin = i - num[i][j] + 1;
					if (lastSubsBegin === thisSubsBegin)
					{//if the current LCS is the same as the last time this block ran
						sequence += str1[i];
					}
					else //this block resets the string builder if a different LCS is found
					{
						lastSubsBegin = thisSubsBegin;
						sequence= ""; //clear it
						sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin);
					}
				}
			}
		}
	}
	return {
		length: maxlen,
		sequence: sequence,
		offset: thisSubsBegin
	};
}


console.log(longestCommonSubstring2('hello world', 'world is peaceful').sequence);
