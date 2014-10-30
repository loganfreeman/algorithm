/*
	author : Sy Le
	http://synle.com
	
	Solving Hanoi Tower (http://en.wikipedia.org/wiki/Tower_of_Hanoi) using iterative approach.
	
	An interactive game can be played at http://www.mathsisfun.com/games/towerofhanoi.html
	
	Given 3 tower A,B,C with A is the initial tables. The peg swap is restricted by that the lower peg must be bigger than the upper peg.
	
	Sample Run : 
	Problem
	A [ 3, 2, 1 ]
	B []
	C []

	Solving
	Move  A  ->  C
	Move  A  ->  B
	Move  C  ->  B
	Move  A  ->  C
	Move  B  ->  A
	Move  B  ->  C
	Move  A  ->  C

	Solved in  7

	Result:
	A []
	B []
	C [ 3, 2, 1 ]
*/
function HanoiTower(aArray){
	var t = this;
	t.A = aArray || [];
	t.B = [];
	t.C = [];
	
	t.totalMove = 0;
	
	t.isSolved = function (){		
		if (t.A.length > 0 || t.B.length > 0)//A or B is not empty, not solved
			return false;
		
		var cur = 9999999999999999;//start out with large number
		for (var i = 0; i < t.C.length; i++){			
			if (cur < t.C[i])
				return false;
			else
				cur = t.C[i];
		}
		
		return true;
	}
	
	t.print = function (){
		console.log('A', t.A);
		console.log('B', t.B);
		console.log('C', t.C);
		console.log('');
	}
	
	t.countDisk = function (){
		return t.A.length + t.B.length + t.C.length;
	}
	
	t.swapPeg = function (from, to){
		//check to see if it is FROM to TO or from TO to FROM
		if (typeof t[from] != 'undefined' && t[from].last() < t[to].last()){
			;
		}
		else{
			var tmp = from;
			from = to;
			to = tmp;
		}
	
		//pop from push to
		var cur = t[from].pop();
		console.log('Move ', from, ' -> ', to);
		t[to].push(cur);
		
		t.totalMove++;
	}
	
	t.solveIterativeApproach = function (){
		var diskCount = t.countDisk;
		var cur;
		var mov = 0;
		if (diskCount == 0)
			console.log('No Disk');
		else if (diskCount % 2 == 0){//even case
			//a & b
			t.swapPeg('A', 'B');
			if (t.isSolved()) return t.totalMove;
			
			//a & c
			t.swapPeg('A', 'C');
			if (t.isSolved()) return t.totalMove;
			
			//b & c
			t.swapPeg('B', 'C');
			if (t.isSolved()) return t.totalMove;
		}
		else{//odd case
			while (!t.isSolved()){			
				//a & c
				t.swapPeg('A', 'C');
				if (t.isSolved()) return t.totalMove;
				
				
				//a & b
				t.swapPeg('A', 'B');
				if (t.isSolved()) return t.totalMove;
				
				//b & c
				t.swapPeg('B', 'C');
				if (t.isSolved()) return t.totalMove;
			}
		}
		
	}
}

/**	
	return the last element in the array,
	if the array is empty, it returns a really big number
*/
Array.prototype.last = function (){
	return this[this.length - 1] || 99999999999999999999999999999;
}

var aHanoiTower = new HanoiTower([3,2,1]);
console.log('Problem');
aHanoiTower.print();

console.log('Solving');
console.log('\nSolved in ', aHanoiTower.solveIterativeApproach());

console.log('\nResult: ');
aHanoiTower.print();