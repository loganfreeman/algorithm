/* information in each game tree node */
var node_size = 12; // number of elements of each game tree node
var slot_node_id = 0;
var slot_node_level = 1;
var slot_number_childs = 2;
var slot_id_first_child = 3;
var slot_value = 4;
var slot_x_pos = 5;
var slot_y_pos = 6;
var slot_alpha = 7;
var slot_beta = 8;
var slot_node_id_parent = 9;
var slot_current_child = 10;
var slot_best_child = 11;

/* tree information */
var gameTreeArray; // array having the game tree
var tree_height; // game tree height
var tree_number_nodes; // total number of nodes

/* draw parameters */
var tx = 12; // triangle size_x = 2*tx
var ty = 12; // triangle size_y = 2*ty

/* simulation parameters */
var setinterval_id;
var current_node_id = 0;
var previous_node_id = -1;
var returned_child_value = 0;
var step_minimax = 0; // current step of algorithm
var simulation_mode = 0; // 0-stop; 1-animated simulation; 2-step-by-step
							// simulation

// constants
var MINUS_INFINITY = -1000; // or -Number.MAX_VALUE;
var PLUS_INFINITY = +1000;
var simulation_cycle = 800; // cycle time (ms)

function step_alphabeta_search() {
	if (simulation_mode == 0) {
		simulation_mode = 2;
		current_node_id = 0;
		previous_node_id = -1;
		step_minimax = 0;
		alphabeta_search();
	} else if (current_node_id == -1 && simulation_mode == 2) {
		step_minimax = 0;
		simulation_mode = 0;
		document.form1.MyMessagesArea.value = " End of simulation!";
		draw_best_path(0);
	} else if (simulation_mode == 2) {
		alphabeta_search();
	}
}

/* Initial call */
function run_alphabeta_search() {
	simulation_mode = 1;
	current_node_id = 0;
	previous_node_id = -1;
	step_minimax = 0;
	setinterval_id = setInterval(alphabeta_search, simulation_cycle);
}

function alphabeta_search() {
	if (previous_node_id >= 0)
		leave_node(previous_node_id * node_size);
	previous_node_id = current_node_id;
	step_minimax++;
	minimax_value();
	if (previous_node_id >= 0)
		enter_node(previous_node_id * node_size);
	if (current_node_id == -1 && simulation_mode == 1) {
		clearInterval(setinterval_id); // ends simulation
		step_minimax = 0;
		simulation_mode = 0;
		document.form1.MyMessagesArea.value = " End of simulation!";
		draw_best_path(0);
	}
}

/* enter one node function */
function minimax_value() {
	var node_idx = current_node_id * node_size;
	var parent_node_idx = gameTreeArray[node_idx + slot_node_id_parent]
			* node_size;

	if (gameTreeArray[node_idx + slot_number_childs] == 0) { // is a terminal
																// node
		current_node_id = gameTreeArray[node_idx + slot_node_id_parent]; // sets
																			// the
																			// next
																			// current_node_id
																			// for
																			// the
																			// simulation
		returned_child_value = gameTreeArray[node_idx + slot_value]; // next
																		// returned_child_value:
																		// the
																		// heuristic
																		// value
																		// of
																		// node
		return;
	}

	if (gameTreeArray[node_idx + slot_current_child] == -1) { // passing alpha
																// and beta
																// values from
																// parent node
		if (parent_node_idx >= 0) {
			gameTreeArray[node_idx + slot_alpha] = gameTreeArray[parent_node_idx
					+ slot_alpha];
			gameTreeArray[node_idx + slot_beta] = gameTreeArray[parent_node_idx
					+ slot_beta];
		}
		if (gameTreeArray[node_idx + slot_node_level] % 2 == 0)
			gameTreeArray[node_idx + slot_value] = MINUS_INFINITY; // max
																	// player
																	// initial
																	// value
		else
			gameTreeArray[node_idx + slot_value] = PLUS_INFINITY; // min
																	// player
																	// initial
																	// value
		gameTreeArray[node_idx + slot_current_child]++;
		current_node_id = gameTreeArray[node_idx + slot_id_first_child]; // sets
																			// the
																			// next
																			// current_node_id
																			// for
																			// the
																			// simulation
		return;
	}

	if (gameTreeArray[node_idx + slot_node_level] % 2 == 0) { // max player
		if (returned_child_value > gameTreeArray[node_idx + slot_value]) {
			gameTreeArray[node_idx + slot_value] = returned_child_value;
			gameTreeArray[node_idx + slot_best_child] = gameTreeArray[node_idx
					+ slot_id_first_child]
					+ gameTreeArray[node_idx + slot_current_child];
		}
		if (gameTreeArray[node_idx + slot_value] >= gameTreeArray[node_idx
				+ slot_beta]) { // Alpha-beta pruning
			draw_prune_nodes(node_idx);
			current_node_id = gameTreeArray[node_idx + slot_node_id_parent];
			returned_child_value = gameTreeArray[node_idx + slot_value];
			return;
		}
		gameTreeArray[node_idx + slot_alpha] = Math.max(gameTreeArray[node_idx
				+ slot_alpha], gameTreeArray[node_idx + slot_value]);
		gameTreeArray[node_idx + slot_current_child]++;
		if (gameTreeArray[node_idx + slot_current_child] < gameTreeArray[node_idx
				+ slot_number_childs]) { // calls next child
			current_node_id = gameTreeArray[node_idx + slot_id_first_child]
					+ gameTreeArray[node_idx + slot_current_child];
		} else { // no more childs: returns to parent
			current_node_id = gameTreeArray[node_idx + slot_node_id_parent];
			returned_child_value = gameTreeArray[node_idx + slot_value];
		}
		return;
	} else { // min player
		if (returned_child_value < gameTreeArray[node_idx + slot_value]) {
			gameTreeArray[node_idx + slot_value] = returned_child_value;
			gameTreeArray[node_idx + slot_best_child] = gameTreeArray[node_idx
					+ slot_id_first_child]
					+ gameTreeArray[node_idx + slot_current_child];
		}
		if (gameTreeArray[node_idx + slot_value] <= gameTreeArray[node_idx
				+ slot_alpha]) { // Alpha-beta pruning
			draw_prune_nodes(node_idx);
			current_node_id = gameTreeArray[node_idx + slot_node_id_parent];
			returned_child_value = gameTreeArray[node_idx + slot_value];
			return;
		}
		gameTreeArray[node_idx + slot_beta] = Math.min(gameTreeArray[node_idx
				+ slot_beta], gameTreeArray[node_idx + slot_value]);
		gameTreeArray[node_idx + slot_current_child]++;
		if (gameTreeArray[node_idx + slot_current_child] < gameTreeArray[node_idx
				+ slot_number_childs]) { // calls next child
			current_node_id = gameTreeArray[node_idx + slot_id_first_child]
					+ gameTreeArray[node_idx + slot_current_child];
		} else { // no more childs: returns to parent
			current_node_id = gameTreeArray[node_idx + slot_node_id_parent];
			returned_child_value = gameTreeArray[node_idx + slot_value];
		}
		return;
	}
}

function draw_best_path(root_id) {
	var canvas = document.getElementById('canvasab');
	var context = canvas.getContext('2d');
	var strokeS = context.strokeStyle; // stores previous strokeStyle
	var lineW = context.lineWidth; // stores previous lineWidth
	context.strokeStyle = "blue";
	context.lineWidth = 2;
	var parent_idx = root_id * node_size;
	while (gameTreeArray[parent_idx + slot_number_childs] > 0) {
		var child_idx = gameTreeArray[parent_idx + slot_best_child] * node_size;
		var bx = gameTreeArray[parent_idx + slot_x_pos];
		var by = gameTreeArray[parent_idx + slot_y_pos] + ty;
		var ex = gameTreeArray[child_idx + slot_x_pos];
		var ey = gameTreeArray[child_idx + slot_y_pos] - ty;
		context.beginPath();
		context.moveTo(bx, by);
		context.lineTo(ex, ey);
		context.stroke();
		context.closePath();
		parent_idx = child_idx;
	}
	context.strokeStyle = strokeS;
	context.lineWidth = lineW;
}

function draw_prune_nodes(parent_idx) {
	var canvas = document.getElementById('canvasab');
	var context = canvas.getContext('2d');
	var child_id = gameTreeArray[parent_idx + slot_current_child] + 1;
	var number_childs = gameTreeArray[parent_idx + slot_number_childs];
	var strokeS = context.strokeStyle; // stores previous strokeStyle
	var lineW = context.lineWidth; // stores previous lineWidth
	context.strokeStyle = "red";
	context.lineWidth = 2;
	while (child_id < number_childs) {
		child_idx = (gameTreeArray[parent_idx + slot_id_first_child] + child_id)
				* node_size;
		var cxp = gameTreeArray[parent_idx + slot_x_pos];
		var cyp = gameTreeArray[parent_idx + slot_y_pos];
		var cxc = gameTreeArray[child_idx + slot_x_pos];
		var cyc = gameTreeArray[child_idx + slot_y_pos];
		var cx = (cxp + cxc) / 2;
		var cy = (cyp + cyc) / 2;
		context.beginPath();
		context.moveTo(cx - 5, cy - 5);
		context.lineTo(cx + 5, cy + 5);
		context.moveTo(cx + 5, cy - 5);
		context.lineTo(cx - 5, cy + 5);
		context.closePath();
		context.stroke();
		child_id++;
	}
	context.strokeStyle = strokeS;
	context.lineWidth = lineW;
}

/* changes node color to yellow and updates node info */
function enter_node(idx_node) {
	var canvas = document.getElementById('canvasab');
	var context = canvas.getContext('2d');
	draw_node(context, idx_node, "yellow");
	var cx = gameTreeArray[idx_node + slot_x_pos];
	var cy = gameTreeArray[idx_node + slot_y_pos];
	var xx = cx - tx * 5 - 2;
	context.fillStyle = "black";
	var oldFont = context.font;
	context.font = "6pt Arial";
	if (gameTreeArray[idx_node + slot_node_level] % 2 == 0)
		context.fillText(step_minimax, cx - 5, cy + 8); // prints step number
														// for max player
	else
		context.fillText(step_minimax, cx - 5, cy - 3); // prints step number
														// for min player
	context.font = oldFont;
	if (gameTreeArray[idx_node + slot_number_childs] > 0) {
		// delete previous node info
		context.fillStyle = "white";
		context.fillRect(xx, cy - 20, tx * 4, 34);
		// updated node info
		context.fillStyle = "black";
		context.fillText("\u237a=" + gameTreeArray[idx_node + slot_alpha], xx,
				cy - 10); // alpha value
		context.fillText("\u03b2=" + gameTreeArray[idx_node + slot_beta], xx,
				cy); // beta value
		context.fillText("v=" + gameTreeArray[idx_node + slot_value], xx,
				cy + 10); // node value
	}
}

/* changes node color to white */
function leave_node(idx_node) {
	var canvas = document.getElementById('canvasab');
	var context = canvas.getContext('2d');
	draw_node(context, idx_node, "white");
}

/* draws node shape and changes node color to white */
function draw_node(context, idx_node, fill_color) {
	var cx = gameTreeArray[idx_node + slot_x_pos];
	var cy = gameTreeArray[idx_node + slot_y_pos];
	context.fillStyle = fill_color;
	if (gameTreeArray[idx_node + slot_node_level] % 2 == 0) { // draw max
																// player
																// triangle node
		context.beginPath();
		context.moveTo(cx, cy - ty);
		context.lineTo(cx - tx, cy + ty);
		context.lineTo(cx + tx, cy + ty);
		context.lineTo(cx, cy - ty);
		context.stroke();
		context.fill();
		context.closePath();
	} else { // draw min player triangle node
		context.beginPath();
		context.moveTo(cx, cy + ty);
		context.lineTo(cx - tx, cy - ty);
		context.lineTo(cx + tx, cy - ty);
		context.lineTo(cx, cy + ty);
		context.stroke();
		context.fill();
		context.closePath();
	}
	context.fillStyle = "black"; // controls text color
	if (gameTreeArray[idx_node + slot_number_childs] == 0) // draw value if is
															// terminal node
		context.fillText(gameTreeArray[idx_node + slot_value], cx - 4, cy + ty
				+ 16);
}

function create_game_tree() {
	if (simulation_mode == 1)
		clearInterval(setinterval_id);
	simulation_mode = 0;

	var stringToSplit = document.form1.treestructure.value;
	var arrayOfStringsInnerNodes = stringToSplit.split(" ");
	stringToSplit = document.form1.utilvalues.value;
	var arrayOfStringsLeafNodes = stringToSplit.split(" ");
	var len1 = arrayOfStringsInnerNodes.length;
	var len2 = arrayOfStringsLeafNodes.length;
	tree_number_nodes = len1 + len2; // total number of nodes
	gameTreeArray = new Array(tree_number_nodes * node_size); // total size of
																// the array
	// first loads into the array the inner nodes
	var dp = 0; // node depth
	if (len1 > 0) {
		gameTreeArray[slot_node_level] = dp; // depth of root node
		gameTreeArray[slot_node_id_parent] = -1; // parent id of root node
		gameTreeArray[slot_alpha] = MINUS_INFINITY; // init alpha value of root
													// node
		gameTreeArray[slot_beta] = PLUS_INFINITY; // init beta value of root
													// node
	}
	for ( var i = 0, j = 0, id_first_child = 1; i < len1; i++, j += node_size) {
		gameTreeArray[j + slot_node_id] = i;
		if (gameTreeArray[j + slot_node_level] % 2 == 0)
			gameTreeArray[j + slot_value] = MINUS_INFINITY; // max player
															// initial value
		else
			gameTreeArray[j + slot_value] = PLUS_INFINITY; // min player
															// initial value
		gameTreeArray[j + slot_current_child] = -1;
		gameTreeArray[j + slot_number_childs] = parseInt(
				arrayOfStringsInnerNodes[i], 10);
		gameTreeArray[j + slot_id_first_child] = id_first_child;
		dp = gameTreeArray[j + slot_node_level];
		for ( var child = 0; child < gameTreeArray[j + slot_number_childs]; child++) {
			gameTreeArray[(id_first_child + child) * node_size
					+ slot_node_level] = dp + 1; // depth of child
			gameTreeArray[(id_first_child + child) * node_size
					+ slot_node_id_parent] = i; // parent id
		}
		id_first_child += gameTreeArray[j + slot_number_childs];
	}
	// second loads into the array the leaf nodes (terminal nodes)
	for ( var i = 0, j = len1 * node_size; i < len2; i++, j += node_size) {
		gameTreeArray[j + slot_node_id] = i + len1;
		gameTreeArray[j + slot_number_childs] = 0; // terminal/leaf node
		gameTreeArray[j + slot_id_first_child] = -1; // because is a
														// terminal/leaf node
		gameTreeArray[j + slot_value] = parseInt(arrayOfStringsLeafNodes[i], 10);
	}

	tree_height = dp + 1;
	prepare_draw_tree(len2);
	print_tree(); // text version of tree (array content)
	draw_tree();
}

function prepare_draw_tree(numLeafNodes) {
	var canvas = document.getElementById('canvasab');
	var context = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	var top_margin_h = 30; // top margin defined for canvas
	var bot_margin_h = 40; // botton margin defined for canvas
	var h_util = h - top_margin_h - bot_margin_h;

	for ( var i = tree_number_nodes - numLeafNodes, j = 1, idx_node = i
			* node_size; i < tree_number_nodes; i++, j++, idx_node += node_size) {
		gameTreeArray[idx_node + slot_y_pos] = parseInt(top_margin_h
				+ (h_util * gameTreeArray[idx_node + slot_node_level])
				/ tree_height);
		gameTreeArray[idx_node + slot_x_pos] = parseInt((w / (numLeafNodes + 1))
				* j);
	}

	for ( var i = tree_number_nodes - numLeafNodes - 1, idx_node = i
			* node_size; i >= 0; i--, idx_node -= node_size) {
		gameTreeArray[idx_node + slot_y_pos] = parseInt(top_margin_h
				+ (h_util * gameTreeArray[idx_node + slot_node_level])
				/ tree_height);
		var fc_idx = gameTreeArray[idx_node + slot_id_first_child] * node_size;
		var lc_idx = (gameTreeArray[idx_node + slot_id_first_child]
				+ gameTreeArray[idx_node + slot_number_childs] - 1)
				* node_size;
		gameTreeArray[idx_node + slot_x_pos] = (gameTreeArray[fc_idx
				+ slot_x_pos] + gameTreeArray[lc_idx + slot_x_pos]) / 2;
	}
}

function draw_tree() {
	var canvas = document.getElementById('canvasab');
	var context = canvas.getContext('2d');
	canvas.width = canvas.width; // resets canvas
	context.strokeStyle = '#000';
	context.lineWidth = 1;

	for ( var i = 0, idx_node = 0; i < tree_number_nodes; i++, idx_node += node_size)
		draw_node(context, idx_node, "white");

	// draw line segments
	for ( var i = 0, idx_node = 0; i < tree_number_nodes; i++, idx_node += node_size) {
		var id_first_child = gameTreeArray[idx_node + slot_id_first_child];
		var number_childs = gameTreeArray[idx_node + slot_number_childs];
		var bx = gameTreeArray[idx_node + slot_x_pos];
		var by = gameTreeArray[idx_node + slot_y_pos] + ty;
		for ( var child = 0; child < number_childs; child++) {
			var ex = gameTreeArray[(id_first_child + child) * node_size
					+ slot_x_pos];
			var ey = gameTreeArray[(id_first_child + child) * node_size
					+ slot_y_pos]
					- ty;
			context.beginPath();
			context.moveTo(bx, by);
			context.lineTo(ex, ey);
			context.stroke();
			context.closePath();
		}
	}
}

function print_tree() {
	document.form1.MyMessagesArea.value = "tree_height=" + tree_height
			+ ";tree_number_nodes=" + tree_number_nodes + ";Tree>";
	for ( var i = 0, len = gameTreeArray.length; i < len; i++) {
		document.form1.MyMessagesArea.value = document.form1.MyMessagesArea.value
				+ gameTreeArray[i] + ",";
	}
	document.form1.MyMessagesArea.value = document.form1.MyMessagesArea.value
			+ "<";
}
