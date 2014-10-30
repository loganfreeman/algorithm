function Node(obj, dimension, parent) {
	this.obj = obj;
	this.left = null;
	this.right = null;
	this.parent = parent;
	this.dimension = dimension;
}
/**
 * 
 * 
 * A k-d tree, or k-dimensional tree, is a data structure used in computer science for organizing some number of points in a space with k dimensions. 
 * It is a binary search tree with other constraints imposed on it. K-d trees are very useful for range and nearest neighbor searches. 
 * 
 * Each level of a k-d tree splits all children along a specific dimension, using a hyperplane that is perpendicular to the corresponding axis.
 * 
 * @param points
 * @param metric
 * @param dimensions
 * @returns
 */
function kdTree(points, metric, dimensions) {

	var self = this;
	/**
	 * 
	 * At the root of the tree all children will be split based on the first dimension.
	 *  (i.e. if the first dimension coordinate is less than the root it will be in the left-sub tree and if it is greater than the root it will obviously be in the right sub-tree).
	 *  Each level down in the tree divides on the next dimension, returning to the first dimension once all others have been exhausted. 
	 *  The most efficient way to build a k-d tree is to use a partition method like the one Quick Sort uses to place the median point at the root and everything with a smaller one dimensional value to the left and larger to the right.
	 *  
	 *   Points are inserted by selecting the median of the points being put into the subtree, with respect to their coordinates in the axis being used to create the splitting plane. 
	 *   (Note the assumption that we feed the entire set of n points into the algorithm up-front.)
	 *   
	 *   This method leads to a balanced k-d tree, in which each leaf node is about the same distance from the root. 
	 *   However, balanced trees are not necessarily optimal for all applications.
	 *   
	 *   This algorithm creates the invariant that for any node, all the nodes in the left subtree are on one side of a splitting plane, and all the nodes in the right subtree are on the other side.
	 *   Points that lie on the splitting plane may appear on either side.
	 *   The splitting plane of a node goes through the point associated with that node. (referred to in the code as node.obj).
	 */
	function buildTree(points, depth, parent) {
		//  // Select axis based on depth so that axis cycles through all valid values
		var dim = depth % dimensions.length, median, node;

		if (points.length === 0) {
			return null;
		}
		if (points.length === 1) {
			return new Node(points[0], dim, parent);
		}
		// Sort point list and choose median as pivot element
		points.sort(function(a, b) {
			return a[dimensions[dim]] - b[dimensions[dim]];
		});

		median = Math.floor(points.length / 2);
		node = new Node(points[median], dim, parent);
		node.left = buildTree(points.slice(0, median), depth + 1, node);
		node.right = buildTree(points.slice(median + 1), depth + 1, node);

		return node;
	}

	// Reloads a serialied tree
	function loadTree(data) {
		// Just need to restore the `parent` parameter
		self.root = data;

		function restoreParent(root) {
			if (root.left) {
				root.left.parent = root;
				restoreParent(root.left);
			}

			if (root.right) {
				root.right.parent = root;
				restoreParent(root.right);
			}
		}

		restoreParent(self.root);
	}

	// If points is not an array, assume we're loading a pre-built tree
	if (!Array.isArray(points))
		loadTree(points, metric, dimensions);
	else
		this.root = buildTree(points, 0, null);

	// Convert to a JSON serializable structure; this just requires removing
	// the `parent` property
	this.toJSON = function(src) {
		if (!src)
			src = this.root;
		var dest = new Node(src.obj, src.dimension, null);
		if (src.left)
			dest.left = self.toJSON(src.left);
		if (src.right)
			dest.right = self.toJSON(src.right);
		return dest;
	};
	/**
	 * 
	 * One adds a new point to a k-d tree in the same way as one adds an element to any other search tree. First, traverse the tree, starting from the root and moving to either the left or the right child depending on whether the point to be inserted is on the "left" or "right" side of the splitting plane.
	 * Once you get to the node under which the child should be located, add the new point as either the left or right child of the leaf node, again depending on which side of the node's splitting plane contains the new node.
	 * Adding points in this manner can cause the tree to become unbalanced, leading to decreased tree performance. The rate of tree performance degradation is dependent upon the spatial distribution of tree points being added, and the number of points added in relation to the tree size.
	 */
	this.insert = function(point) {
		function innerSearch(node, parent) {

			if (node === null) {
				return parent;
			}

			var dimension = dimensions[node.dimension];
			if (point[dimension] < node.obj[dimension]) {
				return innerSearch(node.left, node);
			} else {
				return innerSearch(node.right, node);
			}
		}

		var insertPosition = innerSearch(this.root, null), newNode, dimension;

		if (insertPosition === null) {
			this.root = new Node(point, 0, null);
			return;
		}

		newNode = new Node(point, (insertPosition.dimension + 1)
				% dimensions.length, insertPosition);
		dimension = dimensions[insertPosition.dimension];

		if (point[dimension] < insertPosition.obj[dimension]) {
			insertPosition.left = newNode;
		} else {
			insertPosition.right = newNode;
		}
	};
	/**
	 * To remove a point from an existing k-d tree, without breaking the invariant, the easiest way is to form the set of all nodes and leaves from the children of the target node, and recreate that part of the tree.
	 * 
	 * Another approach is to find a replacement for the point removed.
	 */
	this.remove = function(point) {
		var node;

		function nodeSearch(node) {
			if (node === null) {
				return null;
			}

			if (node.obj === point) {
				return node;
			}

			var dimension = dimensions[node.dimension];

			if (point[dimension] < node.obj[dimension]) {
				return nodeSearch(node.left, node);
			} else {
				return nodeSearch(node.right, node);
			}
		}

		function removeNode(node) {
			var nextNode, nextObj, pDimension;
			// find the point with the maximum x value from the subtree
			function findMax(node, dim) {
				var dimension, own, left, right, max;

				if (node === null) {
					return null;
				}

				dimension = dimensions[dim];
				if (node.dimension === dim) {
					if (node.right !== null) {
						return findMax(node.right, dim);
					}
					return node;
				}

				own = node.obj[dimension];
				left = findMax(node.left, dim);
				right = findMax(node.right, dim);
				max = node;

				if (left !== null && left.obj[dimension] > own) {
					max = left;
				}

				if (right !== null && right.obj[dimension] > max.obj[dimension]) {
					max = right;
				}
				return max;
			}
			// find the point with the minimum x value from the subtree
			function findMin(node, dim) {
				var dimension, own, left, right, min;

				if (node === null) {
					return null;
				}

				dimension = dimensions[dim];

				if (node.dimension === dim) {
					if (node.left !== null) {
						return findMin(node.left, dim);
					}
					return node;
				}

				own = node.obj[dimension];
				left = findMin(node.left, dim);
				right = findMin(node.right, dim);
				min = node;

				if (left !== null && left.obj[dimension] < own) {
					min = left;
				}
				if (right !== null && right.obj[dimension] < min.obj[dimension]) {
					min = right;
				}
				return min;
			}
			// For the base case where R is a leaf node, no replacement is required.
			if (node.left === null && node.right === null) {
				if (node.parent === null) {
					self.root = null;
					return;
				}

				pDimension = dimensions[node.parent.dimension];

				if (node.obj[pDimension] < node.parent.obj[pDimension]) {
					node.parent.left = null;
				} else {
					node.parent.right = null;
				}
				return;
			}
			// For the general case, find a replacement point, say p, from the subtree rooted at R. Replace the point stored at R with p. Then, recursively remove p.
			// For finding a replacement point, if R discriminates on x (say) and R has a right child, find the point with the minimum x value from the subtree rooted at the right child. Otherwise, find the point with the maximum x value from the subtree rooted at the left child.
			if (node.left !== null) {
				nextNode = findMax(node.left, node.dimension); // find the point with the maximum x value from the subtree rooted at the left child
			} else {
				nextNode = findMin(node.right, node.dimension); // find the point with the minimum x value from the subtree rooted at the right child
			}

			nextObj = nextNode.obj;
			removeNode(nextNode);
			node.obj = nextObj;

		}
		// First, find the node R that contains the point to be removed.
		node = nodeSearch(self.root);

		if (node === null) {
			return;
		}

		removeNode(node);
	};
	/**
	 * Starting with the root node, the algorithm moves down the tree recursively, in the same way that it would if the search point were being inserted (i.e. it goes left or right depending on whether the point is less than or greater than the current node in the split dimension).
	 */
	this.nearest = function(point, maxNodes, maxDistance) {
		var i, result, bestNodes;

		bestNodes = new BinaryHeap(function(e) {
			return -e[1];
		});

		function nearestSearch(node) {
			var bestChild, dimension = dimensions[node.dimension], ownDistance = metric(
					point, node.obj), linearPoint = {}, linearDistance, otherChild, i;

			function saveNode(node, distance) {
				bestNodes.push([ node, distance ]);
				if (bestNodes.size() > maxNodes) {
					bestNodes.pop();
				}
			}

			for (i = 0; i < dimensions.length; i += 1) {
				if (i === node.dimension) {
					linearPoint[dimensions[i]] = point[dimensions[i]];
				} else {
					linearPoint[dimensions[i]] = node.obj[dimensions[i]];
				}
			}

			linearDistance = metric(linearPoint, node.obj);
			
			// Once the algorithm reaches a leaf node, it saves that node point as the "current best"
			if (node.right === null && node.left === null) {
				if (bestNodes.size() < maxNodes
						|| ownDistance < bestNodes.peek()[1]) {
					saveNode(node, ownDistance);
				}
				return;
			}

			if (node.right === null) {
				bestChild = node.left;
			} else if (node.left === null) {
				bestChild = node.right;
			} else {
				if (point[dimension] < node.obj[dimension]) {
					bestChild = node.left;
				} else {
					bestChild = node.right;
				}
			}

			nearestSearch(bestChild);

			// If the current node is closer than the current best, then it becomes the current best.
			if (bestNodes.size() < maxNodes
					|| ownDistance < bestNodes.peek()[1]) {
				saveNode(node, ownDistance);
			}

			// The algorithm checks whether there could be any points on the other side of the splitting plane that are closer to the search point than the current best.
			if (bestNodes.size() < maxNodes
					|| Math.abs(linearDistance) < bestNodes.peek()[1]) {
				if (bestChild === node.left) {
					otherChild = node.right;
				} else {
					otherChild = node.left;
				}
				if (otherChild !== null) {
					nearestSearch(otherChild);
				}
			}
		}

		if (maxDistance) {
			for (i = 0; i < maxNodes; i += 1) {
				bestNodes.push([ null, maxDistance ]);
			}
		}

		nearestSearch(self.root);

		result = [];

		for (i = 0; i < maxNodes; i += 1) {
			if (bestNodes.content[i][0]) {
				result.push([ bestNodes.content[i][0].obj,
						bestNodes.content[i][1] ]);
			}
		}
		return result;
	};

	this.balanceFactor = function() {
		function height(node) {
			if (node === null) {
				return 0;
			}
			return Math.max(height(node.left), height(node.right)) + 1;
		}

		function count(node) {
			if (node === null) {
				return 0;
			}
			return count(node.left) + count(node.right) + 1;
		}

		return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
	};
}

// Binary heap implementation from:
// http://eloquentjavascript.net/appendix2.html

function BinaryHeap(scoreFunction) {
	this.content = [];
	this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
	push : function(element) {
		// Add the new element to the end of the array.
		this.content.push(element);
		// Allow it to bubble up.
		this.bubbleUp(this.content.length - 1);
	},

	pop : function() {
		// Store the first element so we can return it later.
		var result = this.content[0];
		// Get the element at the end of the array.
		var end = this.content.pop();
		// If there are any elements left, put the end element at the
		// start, and let it sink down.
		if (this.content.length > 0) {
			this.content[0] = end;
			this.sinkDown(0);
		}
		return result;
	},

	peek : function() {
		return this.content[0];
	},

	remove : function(node) {
		var len = this.content.length;
		// To remove a value, we must search through the array to find
		// it.
		for ( var i = 0; i < len; i++) {
			if (this.content[i] == node) {
				// When it is found, the process seen in 'pop' is repeated
				// to fill up the hole.
				var end = this.content.pop();
				if (i != len - 1) {
					this.content[i] = end;
					if (this.scoreFunction(end) < this.scoreFunction(node))
						this.bubbleUp(i);
					else
						this.sinkDown(i);
				}
				return;
			}
		}
		throw new Error("Node not found.");
	},

	size : function() {
		return this.content.length;
	},

	bubbleUp : function(n) {
		// Fetch the element that has to be moved.
		var element = this.content[n];
		// When at 0, an element can not go up any further.
		while (n > 0) {
			// Compute the parent element's index, and fetch it.
			var parentN = Math.floor((n + 1) / 2) - 1, parent = this.content[parentN];
			// Swap the elements if the parent is greater.
			if (this.scoreFunction(element) < this.scoreFunction(parent)) {
				this.content[parentN] = element;
				this.content[n] = parent;
				// Update 'n' to continue at the new position.
				n = parentN;
			}
			// Found a parent that is less, no need to move it further.
			else {
				break;
			}
		}
	},

	sinkDown : function(n) {
		// Look up the target element and its score.
		var length = this.content.length, element = this.content[n], elemScore = this
				.scoreFunction(element);

		while (true) {
			// Compute the indices of the child elements.
			var child2N = (n + 1) * 2, child1N = child2N - 1;
			// This is used to store the new position of the element,
			// if any.
			var swap = null;
			// If the first child exists (is inside the array)...
			if (child1N < length) {
				// Look it up and compute its score.
				var child1 = this.content[child1N], child1Score = this
						.scoreFunction(child1);
				// If the score is less than our element's, we need to swap.
				if (child1Score < elemScore)
					swap = child1N;
			}
			// Do the same checks for the other child.
			if (child2N < length) {
				var child2 = this.content[child2N], child2Score = this
						.scoreFunction(child2);
				if (child2Score < (swap == null ? elemScore : child1Score)) {
					swap = child2N;
				}
			}

			// If the element needs to be moved, swap it, and continue.
			if (swap != null) {
				this.content[n] = this.content[swap];
				this.content[swap] = element;
				n = swap;
			}
			// Otherwise, we are done.
			else {
				break;
			}
		}
	}
};

this.kdTree = kdTree;

var points = [ {
	x : 1,
	y : 2
}, {
	x : 3,
	y : 4
}, {
	x : 5,
	y : 6
}, {
	x : 7,
	y : 8
} ];

var distance = function(a, b) {
	return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
}

var tree = new kdTree(points, distance, [ "x", "y" ]);

var nearest = tree.nearest({
	x : 5,
	y : 5
}, 2);

console.log(nearest);
