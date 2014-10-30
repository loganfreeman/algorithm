function YaleSparseMatrix(arr) {
	var t = this;

	t.a = [];
	t.ia = [];
	t.ja = [];
	t.colMax = arr[0].length;

	//doing our construction

	//find non zero
	t.ia.push(0); //always split from 0
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[0].length; j++) {
			if (arr[i][j] !== 0) {
				t.a.push(arr[i][j]);
				t.ja.push(j);
			}
		}
		t.ia.push(t.a.length);
	}

	t.print = function () {
		console.log('\na', t.a);
		console.log('ia', t.ia);
		console.log('ja', t.ja);
	}

	t.convertTo2D = function () {
		var ret = [],
		from = 0,
		to = 1,
		i = 0, //use this to loop a and ja
		j = 0;
		
		for (i = 0; i < t.ia.length - 1; i++) {
			ret[i] = [];
			
			//make 0 for the rest
			for (j = 0; j < t.colMax; j++){
				ret[i][j] = 0;
			}
		}

		//construct the value
		for (j = 0; j < t.ia.length - 1; j++) {
			from = t.ia[j];
			to = t.ia[j + 1];
			
			
			for (i = from; i < to; i++) {
				ret[j][t.ja[i]] = t.a[i];
			}
		}
		
		console.log(JSON.stringify(ret));
	}
	
	console.log(JSON.stringify(mat));
	t.print();
	t.convertTo2D();
}

var mat;
mat = [[1, 2, 0, 0], [0, 3, 9, 0], [0, 1, 4, 0]];
mat = [[10,20,0,0,0,0], [0,30,0,40,0,0] , [0,0,50,60,70,0] ,[0,0,0,0,0,80]];
mat = [[0,0,0,0,0,0], [0,0,0,0,0,0] , [0,0,50,60,70,0] ,[0,0,0,0,0,80]];
var sparsedYale = new YaleSparseMatrix(mat);
