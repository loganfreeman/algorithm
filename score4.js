var c = document.getElementById("board");
var ctx = c.getContext("2d");

var width = 7;
var height = 6;
var orangeWins = 1000000;
var yellowWins = -1000000;
var state; // Mutable set in function reset()

var widthW = parseInt(c.getAttribute("width"));
var heightW = parseInt(c.getAttribute("height"));
var platform = navigator.platform + "," + navigator.userAgent;
var gameOver = false;
var clickAllowed = true;

var warning = true;

function getCursorColumn(e) {
    var x;
    if (e.pageX || e.pageY) {
        x = e.pageX - c.offsetLeft;
    }
    else {
	if (warning) {
	    window.alert("Unsupported browser (use one of Firefox/Chrome/IE9/Opera/Safari)");
	    warning = false;
	}
	x = e.clientX + document.body.scrollLeft + 
	    document.documentElement.scrollLeft - c.offsetLeft;
    }
    x /= 81;
    return Math.floor(x);
}

function ScoreBoard()
{
    var counters = [0,0,0,0,0,0,0,0,0];

    // Horizontal spans
    for(var y=0; y<height; y++) {
        var score = state[y][0] + state[y][1] + state[y][2];
        for(var x=3; x<width; x++) {
            score += state[y][x];
            counters[score+4]++;
            score -= state[y][x-3];
        }
    }
    // Vertical spans
    for(var x=0; x<width; x++) {
        var score = state[0][x] + state[1][x] + state[2][x];
        for(var y=3; y<height; y++) {
            score += state[y][x];
            counters[score+4]++;
            score -= state[y-3][x];
        }
    }
    // Down-right (and up-left) diagonals
    for(var y=0; y<height-3; y++) {
        for(var x=0; x<width-3; x++) {
            var score = 0;
            for(var idx=0; idx<4; idx++) {
                score += state[y+idx][x+idx];
            }
            counters[score+4]++;
        }
    }
    // up-right (and down-left) diagonals
    for(var y=3; y<height; y++) {
        for(var x=0; x<width-3; x++) {
            var score = 0;
            for(var idx=0; idx<4; idx++) {
                score += state[y-idx][x+idx];
            }
            counters[score+4]++;
        }
    }
    if (counters[0] != 0)
        return yellowWins;
    else if (counters[8] != 0)
        return orangeWins;
    else 
        return counters[5] + 2*counters[6] + 5*counters[7] - counters[3] - 2*counters[2] - 5*counters[1];
}

function dropDisk(column, color)
{
    for(var row=5; row>=0; row--) {
        if (state[row][column] == 0) {
            state[row][column] = color;
            return row;
        }
    }
    return -1;
}

function minimax(maximizeOrMinimize, color, depth)
{
    if (0 == depth) {
        return [-1, ScoreBoard()];
    } else {
        var bestScore=maximizeOrMinimize?-10000000:10000000;
        var bestMove=-1;
        for (var column=0; column<width; column++) {
            if (state[0][column]!=0) continue;
            var rowFilled = dropDisk(column, color);
            if (rowFilled == -1)
                continue;
            var s = ScoreBoard();
            if (s == (maximizeOrMinimize?orangeWins:yellowWins)) {
                bestMove = column;
                bestScore = s;
                state[rowFilled][column] = 0;
                break;
            }
            var result = minimax(!maximizeOrMinimize, color==1?-1:1, depth-1);
            var scoreInner = result[1];
            // if (depth == 7)
            // alert("Score for " + column + ": " + scoreInner);
            state[rowFilled][column] = 0;
	    // when loss is certain, avoid forfeiting the match,
	    // by shifting scores by depth...
	    if (scoreInner == orangeWins || scoreInner == yellowWins)
		scoreInner -= depth*color;
            if (maximizeOrMinimize) {
                if (scoreInner>=bestScore) {
                    bestScore = scoreInner;
                    bestMove = column;
                } 
            } else {
                if (scoreInner<=bestScore) {
                    bestScore = scoreInner;
                    bestMove = column;
                }
            }
        }
        return [bestMove, bestScore];
    }
}

function playMove()
{
    var startTime = new Date();
    var result = minimax(true,1,7);
    var endTime = new Date();
    if (result[0] != -1)
        dropDisk(result[0], 1);
    DrawBoard();
    if (gameOver) {
	document.getElementById("info").innerHTML = "GAME OVER";
    } else {
	var duration = (endTime.getTime() - startTime.getTime())/1000.0;
	duration = "CPU was thinking for " + duration + " seconds to play the last move.";
	document.getElementById("info").innerHTML = duration;
    }
    clickAllowed = true;
}

function myOnClick(evt)
{
    if (gameOver || !clickAllowed)
        return;
    clickAllowed = false;
    var column = getCursorColumn(evt);
    dropDisk(column, -1);
    DrawBoard();
    if (gameOver) {
	document.getElementById("info").innerHTML = "GAME OVER";
        return;
    }
    document.getElementById("info").innerHTML = "Thinking, please wait...";
    setTimeout("playMove()", 100);
}
c.addEventListener("click", myOnClick, false);

steps = [
   [ [0,0], [-1,1],  [-2,2],  [-3,3]  ],  // diagonal, up-right
   [ [0,0], [0,1],   [0,2],   [0,3]   ],  // horizontal,right
   [ [0,0], [1,1],   [2,2],   [3,3]   ],  // diagonal, down-right
   [ [0,0], [1,0],   [2,0],   [3,0]   ]   // vertical, down
]

function inside(y,x) 
{
    return y>=0 && y<height && x>=0 && x<width;
}

function DrawBoard() 
{
    ctx.beginPath();
    for (var y=0; y<7; y++) {
        ctx.moveTo(0, y*81);
        ctx.lineTo(7*81, y*81);
        ctx.stroke();
    }
    for (var x=0; x<8; x++) {
        ctx.moveTo(x*81,0);
        ctx.lineTo(x*81, 6*81+1);
        ctx.stroke();
    }
    ctx.closePath();

    var statePrint = [[],[],[],[],[],[],[]]
    for (var y=0; y<6; y++) {
        statePrint[y] = state[y].slice(0)
    }

    for (var y=0; y<6; y++) {
        for (var x=0; x<7; x++) {
            for (var direction=0; direction<4; direction++) {
                var score = 0;
                for (var idx=0; idx<4; idx++) {
                    yofs = steps[direction][idx][0];
                    xofs = steps[direction][idx][1];
                    if (inside(y+yofs,x+xofs)) {
                        value = state[y+yofs][x+xofs]
                        if (value==1 || value==-1)
                            score += value;
                    }
                }
                if (score==4 || score==-4) {
                    for (var idx=0; idx<4; idx++) {
                        yofs = steps[direction][idx][0];
                        xofs = steps[direction][idx][1];
                        if (inside(y+yofs,x+xofs))
                            statePrint[y+yofs][x+xofs] = score;
                    }
                    gameOver = true;
                }
            }
        }
    }

    for(var y=0; y<6; y++) {
        for (var x=0; x<7; x++) {
            cell = statePrint[y][x];
            var color = "";
            if      (cell == 1) color="#FF0000";
            else if (cell ==-1) color="#00FF00";
            else if (cell ==-4) color="#007F00";
            else if (cell == 4) color="#7F0000";
            center = (x*81+40, y*81+40);
            if (cell != 0) {
                ctx.beginPath();
                ctx.fillStyle = "#000000";
                ctx.arc(x*81+40, y*81+40, 35, 0, Math.PI*2, true);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.arc(x*81+40, y*81+40, 33, 0, Math.PI*2, false);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function reset()
{
    gameOver = false;
    clickAllowed = true;
    ctx.fillStyle = '#DFDFDF';
    ctx.fillRect(0,0,widthW,heightW);
    state = [
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 1, 0, 0, 0 ]];
    DrawBoard();
    document.getElementById("info").innerHTML = "";
}

reset();