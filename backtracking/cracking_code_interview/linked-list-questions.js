//class
var LinkedList = require("./datastructure/linkedlist.js");


//init linked list.
var listinput = [1, 2, 3, 3, 5, 9, 9, 9, 10, 77,77];
var head;
(function(input){
	head = new LinkedList();
	var cur = head;
	
	for (var i = 0; i < input.length; i++){	
		cur.val = input[i];
		cur.next = new LinkedList();
		cur = cur.next;
	}
})(listinput);

console.log('Linked List');
head.printAll();


/*
	Write code to remove duplicates from an unsorted linked list 
	FOLLOW UP
	How would you solve this problem if a temporary buffer is not allowed? 
*/

function removeDuplicate(nodeHead){
	var newListHead = new LinkedList();
	var curNew = newListHead;
	var count = {};	
	var cur = nodeHead;	

	//get count
	while (cur != null){
		var val = cur.val;
		count[val] = true;		
		cur = cur.next;
	}
	
	//doing the add
	cur = nodeHead;
	while (cur != null){
		var val = cur.val;

		if (count[val]){
			curNew.val = val;
			curNew.next = new LinkedList();
			curNew = curNew.next;

			delete count[val];
		}

		cur = cur.next;
	}	



	return newListHead;
}

/*
	has a new list, that keep track of only unique stuffs,
	anything traversal done, go against that new list and check for uniqueness.
*/
function removeDuplicateWithNoBuffer(nodeHead){
	var cur = nodeHead.next;
	var prev = nodeHead;

	
	while (cur != null){		
		//traverse from left to right in prev
		var trav = nodeHead, isUnique = true;		
		while(trav.next != null){
			console.log(cur.val, trav.val, prev.val);

			if (trav.val == cur.val){
				isUnique = false;
				break;
			}

			if (trav == prev)
				break;
			trav = trav.next;
		}

		console.log(cur.val, isUnique);

		//only add when it is unique
		if (isUnique){
			prev.next = cur;
			prev = prev.next;
		}
			


		cur = cur.next;
	}

	return nodeHead;
}

console.log('duplicate remove');
head = removeDuplicate(head);
head.printAll();