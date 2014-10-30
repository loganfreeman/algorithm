function Node(){
	var t = this;
	
	t.left = null;
	t.right = null;	
	t.val = null;
}

function BinarySearchTree(){
	var t = this;
	var root = new Node();
	t.root = root;
	
	var add = function (val, curNode){
		if (curNode.val == null && curNode.left == null && curNode.right == null){
			//root case
			curNode.val = val;
		}
		else if (val < curNode.val){
			//traverse left
			if (curNode.left != null)
				add(val, curNode.left);
			else{
				curNode.left = new Node();
				curNode.left.val = val;
			}
		}
		else if(val >= curNode.val){
			//traverse right
			if (curNode.right != null)
				add(val, curNode.right);
			else{
				curNode.right = new Node();
				curNode.right.val = val;
			}
		}
	}
	
	t.add = function(val){
		add(val, root);
		return t;
	}
	
	
	
	
	var delCleanup = function (curNode, parentNode){
		console.log(curNode, parentNode);
		
		var parentToMe;
		if (parentNode != null)
			parentToMe = parentNode.left == curNode ? 'left' : 'right';
	
		if (curNode.left == null && curNode.right == null){			
			parentNode[parentToMe] = null;//easy no children
		}
		else if (curNode.left != null && curNode.right != null){
			//has 2 children, go left and right all the way
			var node = curNode.left;
			var pNode = parentNode;
						
			while (node.right != null){
				pNode = node;
				node = node.right;
			}

			
			if (parentNode != null){
				//if parent is not null
				node.right = pNode.right;
				parentNode[parentToMe] = node;
			}
			else{	
				//if root				
				root.val = node.val;
				
				
				//remove my own reference.
				pNode.right = null;
			}
		}
		else{		
			//has only one child, then swap itself with its children
			if (curNode.left != null){
				parentNode[parentToMe]  = curNode.left;
			}
			else if (curNode.right != null){
				parentNode[parentToMe]  = curNode.right;
			}
		}
	}
	var del = function (val, curNode, parentNode){
		if (curNode.val == val){
			delCleanup(curNode, parentNode);
		}
		else if(val <= curNode.val){
			del(val, curNode.left, curNode);
		}
		else if(val > curNode.val){
			del(val, curNode.right, curNode);
		}
	}
	t.del = function (val){
		del(val, root, null);
		return t;
	}
	
	
	
	//traversing
	var traverseInOder = function (curNode, callback){
		if (curNode.left != null)
			traverseInOder(curNode.left, callback);
			
		callback(curNode.val);
		
		if (curNode.right != null)
			traverseInOder(curNode.right, callback);
	}
	
	var traversePreOrder = function (curNode, callback){
		callback(curNode.val);
	
		if (curNode.left != null)
			traversePreOrder(curNode.left, callback);		
		
		if (curNode.right != null)
			traversePreOrder(curNode.right, callback);
	}
	
	t.printInOrder = function(){
		traverseInOder(root, function (val){
			console.log(val);
		});
	}
	
	t.printPreOrder = function (){
		traversePreOrder(root, function (val){
			console.log(val);
		});
	}
	
	
	//moris traverseal
	t.printInOrderLoop  = function (){	
		var cur = root;
		
		while(cur != null){
			if (cur.left ==  null){
				console.log(cur.val);
				cur = cur.right;
			}
			else{
				var rightCur = cur;
			}
		}
	}
}

var b = new BinarySearchTree();
b.add(8).add(3).add(1).add(6).add(4).add(7).add(10).add(14).add(13);