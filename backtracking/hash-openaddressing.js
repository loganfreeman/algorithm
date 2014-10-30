/*
	author: Sy Le
	http://synle.com/

	Implementation of hash using open addressing.
	Much better at dealing with filling up the bucket.
	
	Example Run
	Hash Buckets with Open Addressing
	[, , , 3, 16, 5, 42, 7, 30, , 10]
	Search for 42 6
	Remove 16['Removed', 16]
	Remove 32['CANT REMOVE - NOT FOUND', 32]
	[, , , 3, undefined, 5, 42, 7, 30, , 10]

 */
function OpenAddressHash(hashFun, compareFun, probeFun, maxArraySize) {
	var t = this;
	var hashArr = new Array(maxArraySize || 10);//assume default max is 10 buckets

	if (typeof hashFun == 'undefined')//default hash function
		hashFun = function (v) {return v % 13;}

	if (typeof compareFun == 'undefined')//default compare function
		compareFun = function (a, b) {return a === b;}

	if (typeof probeFun == 'undefined')//default , use linear probing
		probeFun = function (k) {return ++k;}
	
		
	/*
		helper to get the next empty slot used in add
	*/
	var findEmptySlot = function(v){
		//calc hash
		var k = hashFun(v), dest = k;
		var curBucket = hashArr[k];
		
		while (typeof curBucket != 'undefined' && k < hashArr.length){
			if (compareFun(curBucket, v))
				return k;
				
			k = probeFun(k);//move on the next slot using the probing function			
			curBucket = hashArr[k];
		}
		
		return k;//next available slot (used in add)
	}
		

		
		
	t.search = function (v) {
		//calc hash
		var k = hashFun(v);
		var curBucket = hashArr[k];
		
		while (typeof curBucket != 'undefined' && k < hashArr.length){
			if (compareFun(curBucket, v))
				return k;
				
			k = probeFun(k);//move on the next slot using the probing function			
			curBucket = hashArr[k];
		}
		
		return false;//not found
	}

	t.add = function (v) {		
		//calc hash
		var k = findEmptySlot(v);
		hashArr[k] = v;
	}

	t.remove = function (v) {
		var idx = t.search(v);
		
		if (typeof hashArr[idx] != 'undefined')
		{
			hashArr[idx] = undefined;
			return ["Removed", v];
		}
		else{
			return ["CANT REMOVE - NOT FOUND", v];
		}
	}

	t.serialize = function () {
		console.log(hashArr);
	}
}

//example run
var openAddressHash = new OpenAddressHash();
openAddressHash.add(5);
openAddressHash.add(7);
openAddressHash.add(3);
openAddressHash.add(10);
openAddressHash.add(16);
openAddressHash.add(42);
openAddressHash.add(30);

console.log('Hash Buckets with Open Addressing');
openAddressHash.serialize();

console.log('Search for 42', openAddressHash.search(42));

console.log('Remove 16', openAddressHash.remove(16));
console.log('Remove 32', openAddressHash.remove(32));
openAddressHash.serialize();