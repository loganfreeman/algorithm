var DoublyLinkedList = require("./doubly-linked-list");



/**
 * A binary search tree implementation in JavaScript. This implementation does
 * not allow duplicate values to be inserted into the tree, ensuring that there
 * is just one instance of each value.
 * 
 * @class BinarySearchTree
 * @constructor
 */
function BinarySearchTree(data) {

	/**
	 * Pointer to root node in the tree.
	 * 
	 * @property _root
	 * @type Object
	 * @private
	 */

	this._root = null;
	if (arguments.length == 1)
		this.add(data);

}

BinarySearchTree.prototype = {

	// restore constructor
	constructor : BinarySearchTree,

	root : function() {
		return this._root;
	},

	setRoot : function(node) {
		this._root = node;
	},

	// -------------------------------------------------------------------------
	// Private members
	// -------------------------------------------------------------------------

	/**
	 * Appends some data to the appropriate point in the tree. If there are no
	 * nodes in the tree, the data becomes the root. If there are other nodes in
	 * the tree, then the tree must be traversed to find the correct spot for
	 * insertion.
	 * 
	 * @param {variant}
	 *            value The data to add to the list.
	 * @return {Void}
	 * @method add
	 */
	add : function(value) {

		// create a new item object, place data in
		var node = {
			value : value,
			left : null,
			right : null
		},

		// used to traverse the structure
		current;

		// special case: no items in the tree yet
		if (this._root === null) {
			this._root = node;
		} else {
			current = this._root;

			while (true) {

				// if the new value is less than this node's value, go left
				if (value < current.value) {

					// if there's no left, then the new node belongs there
					if (current.left === null) {
						current.left = node;
						break;
					} else {
						current = current.left;
					}

					// if the new value is greater than this node's value, go
					// right
				} else if (value > current.value) {

					// if there's no right, then the new node belongs there
					if (current.right === null) {
						current.right = node;
						break;
					} else {
						current = current.right;
					}

					// if the new value is equal to the current one, just ignore
				} else {
					break;
				}
			}
		}
		return this;
	},

	/**
	 * Determines if the given value is present in the tree.
	 * 
	 * @param {variant}
	 *            value The value to find.
	 * @return {Boolean} True if the value is found, false if not.
	 * @method contains
	 */
	contains : function(value) {

		var found = false, current = this._root

		// make sure there's a node to search
		while (!found && current) {

			// if the value is less than the current node's, go left
			if (value < current.value) {
				current = current.left;

				// if the value is greater than the current node's, go right
			} else if (value > current.value) {
				current = current.right;

				// values are equal, found it!
			} else {
				found = true;
			}
		}

		// only proceed if the node was found
		return found;

	},

	/**
	 * Removes the node with the given value from the tree. This may require
	 * moving around some nodes so that the binary search tree remains properly
	 * balanced.
	 * 
	 * @param {variant}
	 *            value The value to remove.
	 * @return {void}
	 * @method remove
	 */
	remove : function(value) {

		var found = false, parent = null, current = this._root, childCount, replacement, replacementParent;

		// make sure there's a node to search
		while (!found && current) {

			// if the value is less than the current node's, go left
			if (value < current.value) {
				parent = current;
				current = current.left;

				// if the value is greater than the current node's, go right
			} else if (value > current.value) {
				parent = current;
				current = current.right;

				// values are equal, found it!
			} else {
				found = true;
			}
		}

		// only proceed if the node was found
		if (found) {

			// figure out how many children
			childCount = (current.left !== null ? 1 : 0)
					+ (current.right !== null ? 1 : 0);

			// special case: the value is at the root
			if (current === this._root) {
				switch (childCount) {

				// no children, just erase the root
				case 0:
					this._root = null;
					break;

				// one child, use one as the root
				case 1:
					this._root = (current.right === null ? current.left
							: current.right);
					break;

				// two children, little work to do
				case 2:

					// new root will be the old root's left child...maybe
					replacement = this._root.left;

					// find the right-most leaf node to be the real new root
					while (replacement.right !== null) {
						replacementParent = replacement;
						replacement = replacement.right;
					}

					// it's not the first node on the left
					if (replacementParent !== null) {

						// remove the new root from it's previous position
						replacementParent.right = replacement.left;

						// give the new root all of the old root's children
						replacement.right = this._root.right;
						replacement.left = this._root.left;
					} else {

						// just assign the children
						replacement.right = this._root.right;
					}

					// officially assign new root
					this._root = replacement;

					// no default

				}

				// non-root values
			} else {

				switch (childCount) {

				// no children, just remove it from the parent
				case 0:
					// if the current value is less than its parent's, null out
					// the left pointer
					if (current.value < parent.value) {
						parent.left = null;

						// if the current value is greater than its parent's,
						// null out the right pointer
					} else {
						parent.right = null;
					}
					break;

				// one child, just reassign to parent
				case 1:
					// if the current value is less than its parent's, reset the
					// left pointer
					if (current.value < parent.value) {
						parent.left = (current.left === null ? current.right
								: current.left);

						// if the current value is greater than its parent's,
						// reset the right pointer
					} else {
						parent.right = (current.left === null ? current.right
								: current.left);
					}
					break;

				// two children, a bit more complicated
				case 2:

					// reset pointers for new traversal
					replacement = current.left;
					replacementParent = current;

					// find the right-most node
					while (replacement.right !== null) {
						replacementParent = replacement;
						replacement = replacement.right;
					}

					replacementParent.right = replacement.left;

					// assign children to the replacement
					replacement.right = current.right;
					replacement.left = current.left;

					// place the replacement in the right spot
					if (current.value < parent.value) {
						parent.left = replacement;
					} else {
						parent.right = replacement;
					}

					// no default

				}

			}

		}

	},

	/**
	 * Returns the number of items in the tree. To do this, a traversal must be
	 * executed.
	 * 
	 * @return {int} The number of items in the tree.
	 * @method size
	 */
	size : function() {
		var length = 0;

		this.traverse(function(node) {
			length++;
		});

		return length;
	},

	/**
	 * Converts the tree into an array.
	 * 
	 * @return {Array} An array containing all of the data in the tree.
	 * @method toArray
	 */
	toArray : function() {
		var result = [];

		this.inOrderTraverse(function(node) {
			result.push(node.value);
		});

		return result;
	},

	/**
	 * Converts the list into a string representation.
	 * 
	 * @return {String} A string representation of the list.
	 * @method toString
	 */
	toString : function() {
		return this.toArray().toString();
	},

	/**
	 * Traverses the tree and runs the given method on each node it comes across
	 * while doing an in-order traversal.
	 * 
	 * @param {Function}
	 *            process The function to run on each node.
	 * @return {void}
	 * @method traverse
	 */
	inOrderTraverse : function(process) {

		// helper function
		function inOrder(node) {
			if (node) {

				// traverse the left subtree
				if (node.left !== null) {
					inOrder(node.left);
				}

				// call the process method on this node
				process.call(this, node);

				// traverse the right subtree
				if (node.right !== null) {
					inOrder(node.right);
				}
			}
		}

		// start with the root
		inOrder(this._root);
	},

	treeToDoublyList : function(root) {
		var list = new DoublyLinkedList();
		this.inOrderTraverse(function(node) {

			if (node.hasOwnProperty("value")) {
				list.add(node.value);
			}
		});

		return list;
	},

	writeBinaryTree : function() {
		var that = this;

		function _preOrderTraverse(process) {

			// helper function
			function preOrder(node) {
				// call the process method on this node
				process.call(this, node);

				if (node) {
					// traverse the left subtree
					preOrder(node.left);

					// traverse the right subtree
					preOrder(node.right);
				}

			}

			// start with the root
			preOrder(that._root);
		}

		var ret = "";
		_preOrderTraverse(function(node) {
			if (node)
				ret += node.value + " ";
			else
				ret += "# ";
		});
		return ret;
	},

	preOrderTraverse : function(process) {

		// helper function
		function preOrder(node) {
			if (node) {
				// call the process method on this node
				process.call(this, node);

				// traverse the left subtree
				if (node.left !== null) {
					preOrder(node.left);
				}

				// traverse the right subtree
				if (node.right !== null) {
					preOrder(node.right);
				}
			}
		}

		// start with the root
		preOrder(this._root);
	},
	prettyPrint : function() {
		var depth = 0;
		// helper function
		function preOrder(node) {
			if (node) {
				var temp = [];
				for (var i = 0; i < depth; i++) {
					temp[temp.length] = "*";
				}
				temp[temp.length] = node.value;
				console.log(temp.join(""));
				depth++;
				// traverse the left subtree
				if (node.left !== null) {
					preOrder(node.left);
				}

				// traverse the right subtree
				if (node.right !== null) {
					preOrder(node.right);
				}
			}
		}

		// start with the root
		preOrder(this._root);
	},
	LCA : function(root, p, q) {
		if (!root || !p || !q)
			return void 0;
		if (root.value == p || root.value == q)
			return root;
		var totalMatches = this.countMatchesPQ(root.left, p, q);
		if (totalMatches == 1)
			return root;
		else if (totalMatches == 2)
			return this.LCA(root.left, p, q);
		else
			/* totalMatches == 0 */
			return this.LCA(root.right, p, q);
	},
	// Return #nodes that matches P or Q in the subtree
	countMatchesPQ : function(root, p, q) {
		if (!root)
			return 0;
		var matches = this.countMatchesPQ(root.left, p, q) + this.countMatchesPQ(root.right, p, q);
		if (root.value == q || root.value == p)
			return 1 + matches;
		else
			return matches;
	},
};
var tree = new BinarySearchTree();
tree.add(3).add(5).add(7).add(6).add(4).add(13).add(23).add(34);
console.log(tree.toString());
var lca = tree.LCA(tree._root, 7, 13);
console.log(lca.value);
tree.prettyPrint();

BinarySearchTree.sortedListToBST = function(head) {
	var tree = new BinarySearchTree();
	var current = head;
	while (current) {
		tree.add(current.data);
		current = current.next;
	}
	return tree;
};

BinarySearchTree.sortedArrayToBST = function(arr, start, end) {
	if (start > end)
		return new BinarySearchTree();
	// same as (start+end)/2, avoids overflow.
	var mid = Math.floor(start + (end - start) / 2);
	var node = new BinarySearchTree(arr[mid]);
	node.root().left = BinarySearchTree.sortedArrayToBST(arr, start, mid - 1)
			.root();
	node.root().right = BinarySearchTree.sortedArrayToBST(arr, mid + 1, end)
			.root();
	return node;
};

BinarySearchTree.readBinaryTree = function(str) {
	var arr = str.split(" ");
	function _readTree(tokenArr) {
		var token = tokenArr.shift();
		if (!isNaN(token)) {
			var p = {
				value : token,
				left : null,
				right : null
			};
			p.left = _readTree(tokenArr);
			p.right = _readTree(tokenArr);
			return p;
		} else
			return null;
	}
	var node = _readTree(arr);
	var ret = new BinarySearchTree();
	ret.setRoot(node);
	return ret;

};

BinarySearchTree.findLargestBST = function(bt) {
	var maxNodes = 0;
	var INT_MIN = -9999;
	var INT_MAX = 9999;
	if (!bt)
		return null;
	var tree = new BinarySearchTree();
	function findBSTRecursive(node, min, max) {
		if (!node)
			return 0;
		if (min < node.data && node.data < max) {
			var leftNodes = findBSTRecursive(node.left, min, node.data);
			var rightNodes = findBSTRecursive(node.right, node.data, max);
			if (leftNodes + rightNodes + 1 > maxNodes) {
				maxNodes = leftNodes + rightNodes + 1;
			}
			return leftNodes + rightNodes + 1;

		} else {
			findBSTRecursive(node, INT_MIN, INT_MAX);
			return 0;
		}
	}
	return tree;
};
module.exports = BinarySearchTree;
