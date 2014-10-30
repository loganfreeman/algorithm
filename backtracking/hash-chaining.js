/*
	author: Sy Le
	http://synle.com/

	Implementation of hash using chaining (or linkedlist).
	Easier to understand compared with open addressing. But waste a lot of space.
 */
function OpenAddressHash(hashFun, compareFun) {
	var t = this;
	var hashArr = {};

	if (typeof hashFun == 'undefined')//default hash function
		hashFun = function (v) {return v % 13;}

	if (typeof compareFun == 'undefined')//default compare function
		compareFun = function (a, b) {return a === b;}

	t.search = function (v) {
		//calc hash
		var k = hashFun(v);
		var matchedBucket = hashArr[k];
		
		//search for item
		if (typeof matchedBucket != 'undefined'){
			for (var i = 0; i < matchedBucket.size(); i++){
				if (compareFun(matchedBucket.get(i), v)){
					return [k, i];
				}
			}			
		}
		
		return false;
	}

	t.add = function (v) {
		var k = hashFun(v);
		hashArr[k] = hashArr[k] || new LinkedList();
		hashArr[k].add(v);
	}

	t.serialize = function () {
		for (var k in hashArr)
			if (typeof k != 'undefined') {
				console.log(k, hashArr[k].serialize());
			}
	}
}

function LinkedList() {
	var t = this;
	var arr = [];

	t.add = function (val) {
		arr.push(val);
	}

	t.get = function (i) {
		if (t.isEmpty())
			throw('LinkedList is empty');
		return arr[i];
	}

	t.isEmpty = function () {
		return arr.length == 0;
	}

	t.size = function () {
		return arr.length;
	};

	t.serialize = function () {
		return arr;
	}
}

//example run
var chainHash = new OpenAddressHash();
chainHash.add(5);
chainHash.add(7);
chainHash.add(3);
chainHash.add(10);
chainHash.add(16);
chainHash.add(42);
chainHash.add(30);

console.log('Hash Buckets with LinkedList');
chainHash.serialize();

console.log('Search for 42', chainHash.search(42));
