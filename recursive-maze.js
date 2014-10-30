// Recursive Maze . jdeseno@gmail.com

var Tile = {STONE: '#'
           ,FLOOR: '.'
           } 

function last(lat) {
    if (lat.length > 0) return lat[lat.length-1]
}

function rnd(n, min) {
    min = min || 0
    return min + Math.round((n - min) * Math.random());
}

function K(obj, f) {
    f(obj)
    return obj;
}

// This cc implementation is just for fun.
// Don't use exception handling this way in production code!
// See underscore's or prototype's iterators for an example of a better way to do this.
function cc(f) {
    var jump = {}
      , ret
    try {
        ret = f(function(v) {ret = v; throw jump;})
    } catch(err) {
        if (err !== jump) throw err;
    }
    return ret;
}

function filter(lat, f) {
    return K([], function(a) {
        each(lat, function(v) {
            if (f(v)) a.push(v);
        })
    });
}

function any(lat, f) {
    return !!cc(function(matched) {
        each(lat, function(v) {
            if (f(v)) matched(true);
        })
    });
}

function each(lat, f) {
    for (var i=0; i<lat.length; i++) f(lat[i]);
}

function each_xy(x, y, f) {
    for (var i=0; i<x; i++)
        for (var j=0; j<y; j++) f(i, j);
}

function each_inside_xy(rect, f) {
    each_xy(rect.width, rect.height, function(x, y) {
        f(rect.x + x, rect.y + y)
    });
}

function neighbors(cell, m) {
    return K([], function(a) {
        each([[-1, 0], [0, -1], [1, 0], [0, 1]], function(point) {
            if (m[cell.x + point[0]] && m[cell.x + point[0]][cell.y + point[1]]) {
                a.push(m[cell.x + point[0]][cell.y + point[1]])
            }
        })
    });
}

function diags(cell, m) {
    return K([], function(a) {
        each([[-1, -1], [1, -1], [1, 1], [-1, 1]], function(point) {
            if (m[cell.x + point[0]] && m[cell.x + point[0]][cell.y + point[1]]) {
                a.push(m[cell.x + point[0]][cell.y + point[1]])
            }
        })
    });
}

function rnd_pick(lat) {
    var ret
    if (lat.length <= 1) {
        if (lat.length === 1) ret = lat[0];
    } else {
        ret = lat[rnd(lat.length - 1)];
    }
    return ret;
}

this.carve = function(grid) {
    var any_floors = function(lat) {
            return any(lat, function(cell) {
                return cell.kind === Tile.FLOOR;
            });
        }
      , allowed = function(current, neighbor, grid) {
            if (neighbor.kind === Tile.FLOOR)
                return false;

            // orthogonial check
            if (any_floors(neighbors(neighbor, grid).filter(function(cell) { return cell !== current; })))
                return false;

            // diagional check
            var current_ortho = neighbors(current, grid)
              , diags_away_from_current  = diags(neighbor, grid).filter(function(cell) {
                    return !any(current_ortho, function(ortho) {
                        return ortho === cell;
                    });
                })
            return !any_floors(diags_away_from_current);
        }
      , z = [grid[rnd(grid.width)][rnd(grid.height)]]

    for (var current=last(z); current; current=last(z)) {
        current = rnd_pick(neighbors(current, grid).filter(function(near) {
            return allowed(current, near, grid);
        }))

        if (current) {
            current.kind = Tile.FLOOR
            z.push(current)
        } else {
            z.pop()
        }
    }
    return grid
}

this.print = function(grid) {
    process.stdout.write("\n")
    for (var y=0; y<grid.height; y++) {
        for (var x=0; x<grid.width; x++) {
            process.stdout.write(grid[x][y].kind)
        }
        process.stdout.write("\n")
    }
    ;process.stdout.write("\n")
}

this.grid = function(width, height) {
    return K({width: width, height: height}, function(grid) {
        each_xy(grid.width, grid.height, function(x, y) {
            if (!grid[x]) grid[x] = {};
            grid[x][y] = {x: x, y: y, kind: Tile.STONE}
        })
    })
}

