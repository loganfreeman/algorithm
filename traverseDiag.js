// http://stackoverflow.com/questions/2862802/traverse-2d-array-matrix-diagonally
/**
 * 
 Your matrix construction gives you a rectangle like this (where your a array is the set of rows):

 0  1  2  3
 4  5  6  7
 8  9 10 11
Which means the diagonals are over this grid:

 #  #  0  1  2  3
    #  4  5  6  7  #
       8  9 10 11  #  #
       
Now we're just looping over a skewed rectangle, that would look like this normalised:

 #  #  0  1  2  3
 #  4  5  6  7  #
 8  9 10 11  #  #
 
 the first column is effectively the old first column, 0, minus the number of rows m, plus 1, which gives 0 - m + 1 or 1 - m
 * 
 * 
 */
var m = 3;
var n = 4;
var a = new Array();
var b = 0;

for(var i = 0; i < m; i++) {
  a[i] = new Array(n);
  for(var j = 0; j < n; j++) {
    a[i][j] = b;
      b++;
  }
}

var out = new Array();
for (var i = 1 - m; i < n; i++) {
    var group = new Array();
    for (var j = 0; j < m; j++) {
        if ((i + j) >= 0 && (i + j) < n) {
            group.push(a[j][i + j]);
        }
    }
    out.push(group);
}

var skewed = new Array();
for (var i = 0; i < n + m - 1; i++) {
    var group = new Array();
    for (var j = 0; j < m; j++) {
        if ((i - j) >= 0 && (i - j) < n) {
            group.push(a[j][i - j]);
        }
    }
    skewed.push(group);
}

console.log(out);

console.log(skewed);