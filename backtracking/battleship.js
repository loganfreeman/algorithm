var Board = (function (){
	var movesArray = [];//array of x,y and player and ship
	var boardSize = 10;
	
	//public classes
	return {
		init : function (shipAs, shipBs, size){
			for (var i = 0; i < shipAs.length; i++){
				movesArray.push({x : shipAs[i].x, y : shipAs[i].y, player: 'A', ship : i, destroy : false});
			}
			
			for (var i = 0; i < shipBs.length; i++){
				movesArray.push({x : shipBs[i].x, y : shipBs[i].y, player: 'B', ship : i, destroy : false});
			}
			
			boardSize = size;
		},
	
		move : function (player, coord){
			for (var i = 0; i < movesArray.length; i++){
				
			}
		}		
	}
})();