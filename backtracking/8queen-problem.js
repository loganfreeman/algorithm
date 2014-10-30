/*
	Solve n queens puzzles. Putting n queens on a chessboard so that
	they don't conflict (horizontally, vertically and diagonally).
	
	https://en.wikipedia.org/wiki/Eight_queens_puzzle
	
	
	Input : number of queen
	Output : the location of queens.
	
	
	Eg:
	
	4 queens : [ { x: 0, y: 2 }, { x: 3, y: 1 }, { x: 2, y: 3 }, { x: 1, y: 0 } ]
	
	5 queens : [ { x: 0, y: 4 },
		  	    { x: 4, y: 2 },
			    { x: 3, y: 0 },
				{ x: 2, y: 3 },
				{ x: 1, y: 1 } ]
			
	6 queens : [ { x: 0, y: 4 },
				  { x: 5, y: 1 },
				  { x: 4, y: 3 },
				  { x: 3, y: 5 },
				  { x: 2, y: 0 },
				  { x: 1, y: 2 } ]
				  
				  
	7 queens : [ { x: 0, y: 6 },
				  { x: 6, y: 4 },
				  { x: 5, y: 2 },
				  { x: 4, y: 0 },
				  { x: 3, y: 5 },
				  { x: 2, y: 3 },
				  { x: 1, y: 1 } ]
*/

/*
	coordinate class that contains x (row) and y (col)
*/
function Coord (x, y){
	var t = this;
	t.x = x;
	t.y = y;
}


/*
	size (the size of the chess board)
	arrOfMove (array of all queen placement stored in Coord class format).
	
	
	return true if the queens are crossing each other 
	(diagonally, horizontally or vertically)	
*/
function isPieceCrash(arrOfMove){
	if (arrOfMove.length == 0)
		return false;
	else
	{
		var hashCount = {};//x.y is the key
	
		//o(n^2)
		for (var i = 0; i < arrOfMove.length; i++){
			for (var j = i + 1; j < arrOfMove.length; j++){
				var ptA = arrOfMove[i];
				var ptB = arrOfMove[j];
				
				//if same x
				if (ptA.x == ptB.x)
					return true + ' row';//same row
				
				//if same y
				if (ptA.y == ptB.y)
					return true + ' col';//same col				
				
				//diagonal is tricky (right diag)
				if (ptB.x - ptA.x == ptB.y - ptA.y)
					return true + ' right diag';
					
				if (ptB.x - ptA.x == -(ptB.y - ptA.y))
					return true + ' left diag';
			}
		}
		
		return false;
	}
}

/*
	utility method to clone an object 
	used to imitate passing array by value in the main solver method
*/
function clone(o){
	return JSON.parse(JSON.stringify(o));
}



/*
	actual method that solve the 8 queen puzzle.
	
	this is an iterative approach using stacks instead of recursive.
*/

var goodList = [];
function Solve8Queen(size){
	var triesStack = [];//list of current coor tries (overlap is counted)
	var queenCountStack = [];//number of queen
	var backTrackStack = [];//number of queen
	var curSolution = [];//placement of solutions
	
	
	//start
	var start = new Coord(0,0);//start at 0,0
	var queen = 0;
	var curBoard = [];
	
	
	//construct an empty
	var boards = [];//array of already placed piece
	
	while (queen < size){
		//find all possible move
		//from where you are, go right, then bottom
		var i = start.x, j = start.y;
		
		while (i < size){
			var curCoord = new Coord(i,j);						
			var newBoard = clone(curBoard);
			
			//check to see if we need to add
			var add = true;
			var push = false;
			for (var p = 0; p < newBoard.length; p++){				
				if (newBoard[p].x == i && newBoard[p].y == j){
					add = false;
					break;
				}
			}
			
			
			if (add){
				newBoard.push(curCoord);
			
				var isCrash = isPieceCrash(newBoard);
				
				if (isCrash){
					//crash, then pop;
					//curBoard.pop();//pop in case of a crash
				}
				else{
					//if valid, then push
					triesStack.push(curCoord);
					queenCountStack.push(queen + 1);
					backTrackStack.push({queen : queen + 1, board : newBoard});
					
					push = true;
				}
			}
			
			j++;//next move
			
			if (j >= size){
				//move on to the next row
				j = 0;
				i++;
			}
			

			if (newBoard.length == size && push){//found the board
				return newBoard;
			}
		}
		
		if (backTrackStack.length == 0)
			return false;
		
		//move on to the next
		var bt = backTrackStack.pop();
		curSolution.push(bt.board);
		curBoard = bt.board;
			queen = curBoard.length;
		
		//cur coor
		start = curBoard[0];
	}
	
	return JSON.stringify(curSolution);
}


//testing the input
console.log('4 queens :', Solve8Queen(4));
console.log('5 queens :', Solve8Queen(5));
console.log('6 queens :', Solve8Queen(6));
console.log('7 queens :', Solve8Queen(7));
