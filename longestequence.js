var nodes = [];

var node_map = {};

function node(v, i, j){
	this.v = v;
	this.i = i;
	this.j = j;
	this.edges = [];
}

function addNodeEdge(node,col){
	var i = node.i, j = node.j, v= node.v;
	var other;
	other = node_map[j-1 + col* (i-1)];
	
	if(other) {			
		if((other.v >= node.v) && ((Math.abs(other.i - node.i) < 2) && (Math.abs(other.j - node.j) < 2))){
			node.edges.push(other)
		}	
	}
	
	other = node_map[j + col * (i-1)];
	if(other) {
		if((other.v >= node.v) && ((Math.abs(other.i - node.i) < 2) && (Math.abs(other.j - node.j) < 2))){
			node.edges.push(other)
		}
	}
	
	other = node_map[j+1 + col * (i-1)];
	if(other) {
		if((other.v >= node.v) && ((Math.abs(other.i - node.i) < 2) && (Math.abs(other.j - node.j) < 2))){
			node.edges.push(other)
		}
	}
	
	other = node_map[j-1 + col * (i)];
	if(other) {
		if((other.v >= node.v) && ((Math.abs(other.i - node.i) < 2) && (Math.abs(other.j - node.j) < 2))){
			node.edges.push(other)
		}
	}
	
	other = node_map[j+1 + col * (i)];
	if(other) {
		if((other.v >= node.v) && ((Math.abs(other.i - node.i) < 2) && (Math.abs(other.j - node.j) < 2))){
			node.edges.push(other)
		}
	}
	
	other = node_map[j-1 + col * (i+1)];
	if(other) {
		if((other.v >= node.v) && ((Math.abs(other.i - node.i) < 2) && (Math.abs(other.j - node.j) < 2))){
			node.edges.push(other)
		}
	}
	
	other = node_map[j + col * (i+1)];
	if(other) {
		if((other.v >= node.v) && ((Math.abs(other.i - node.i) < 2) && (Math.abs(other.j - node.j) < 2))){
			node.edges.push(other)
		}
	}
	
	other = node_map[j+1 + col * (i+1)];
	if(other) {
		if((other.v >= node.v) && ((Math.abs(other.i - node.i) < 2) && (Math.abs(other.j - node.j) < 2))){
			node.edges.push(other)
		}
	}
}

function findLongestPath(node){
	
	if(node.visited){
		if(node.path){
			return node.path;
		}
		else{
			return 0;
		}
	}
	node.visited = true;
	if(node.edges.length > 0){
		var max_path = 0;
		node.edges.forEach(function(n){
			var subpath = findLongestPath(n)
			if(max_path < subpath ){
				max_path = subpath;
			}
		})
		node.path = max_path + 1;
	}else{
		node.path = 1;
	}

	return node.path;
}

function longestSequence(grid) {
	var rol = grid.length;
	var col = grid[0].length;
	for(var i=0; i<rol; i++){
		for(var j=0; j<col; j++){
			var value = grid[i][j];
			var current;
			nodes.push(current = new node(value, i, j));
			node_map[j + col*i]= current;
		}
	}
	nodes.forEach(function(node){
		addNodeEdge(node, col);
	})

	nodes.forEach(function(node){	
		findLongestPath(node);
	})
	
	var length = 0;
	
	nodes.forEach(function(node){
		if(node.path > length){
			length = node.path;
		}
	})
	
	return length;
}

var grid = [[8,2,4],
			[0,7,1],
			[3,7,9]];


var longest_sequence_length = longestSequence(grid);

//console.log(longest_sequence_length);