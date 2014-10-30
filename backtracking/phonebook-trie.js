<<<<<<< HEAD
/*
	author : Sy Le
	www.synle.com
	
	Write a program for a phone book with people's name, address and phone number so that we can search by name , phone and address very quickly.
	
	
	This algorithm uses trie.
	
	Example:
	
	Search by name being "Sy Le"
	[{"name":"Sy Le","phone":"4084081111","address":"1422 BrandyBucks Way, San Jose, CA, 95121"}]

	Search by address being "1422 BrandyBucks Way, San Jose, CA, 95121"
	[{"name":"Sy Le","phone":"4084081111","address":"1422 BrandyBucks Way, San Jose, CA, 95121"},{"name":"Doan Nguyen","phone":"4084082222","address":"1422 BrandyBucks Way, San Jose, CA, 95121"}]

	Search by phone being "5105102222"
	[{"name":"Peter Yang","phone":"5105102222","address":"10230 Johnson Ave, San Jose, CA, 95014"}]
*/

/*
	helper class to store node
*/
function TrieNode(){
	var t = this;
	t.lookup = {};
	t.val = [];
}


/*
	phone book trie class
	
	contacts : is an array of contacts in the other they are in	
	trie : is the trie structure with keys as followed
		starting with @ is a name
		starting with # is a phone
		starting with $ is a address
*/
function PhoneBookTrie(){
	var t = this;
	var uuid = 1;
	
	t.contacts = [];
	t.trie = new TrieNode();//prefix $ for address, # for number, @ for name
	
	var insertTrieNode = function (key, val){
		var cur = t.trie;
		
		for (var i = 0; i < key.length; i++){
			//already there, then traverse down
			if (typeof cur.lookup[key[i]] == 'undefined'){
				cur.lookup[key[i]] = new TrieNode();
			}
			
			cur = cur.lookup[key[i]];
		}
		
		cur.val.push(uuid);
	}
	
	var searchTrieNode = function (key){
		var cur = t.trie;
		
		for (var i = 0; i < key.length; i++){
			if (typeof cur.lookup[key[i]] == 'undefined'){
				return [];//nothing like this
			}
			
			cur = cur.lookup[key[i]];
		}
		
		return cur.val;//return matching uuid		
	}
	
	t.add = function (name, phone, address){
		t.contacts[uuid] = {name : name, phone : phone, address : address};
		
		//work on the trie;
		//name
		name = '@' + name;
		insertTrieNode(name);
		
		
		//phone
		phone = '#' + phone;
		insertTrieNode(phone);
		
		//address
		address = '$' + address;
		insertTrieNode(address);
		
		
		uuid++;
	}
	
	t.search = function(category, searchTerm){
		switch(category.toLowerCase()){
			case 'name':
				searchTerm = '@' + searchTerm;
				break;
		
			case 'phone':
				searchTerm = '#' + searchTerm;
				break;
		
			case 'address':
				searchTerm = '$' + searchTerm;				
				break;
		}
		
		
		var matches = searchTrieNode(searchTerm); //uuid
		var ret = [];
		for (var i = 0; i < matches.length; i++){//lookup for contact from uuid for name
			ret.push(t.contacts[matches[i]]);
		}
		
		return ret;
	}
}

var phoneBook = new PhoneBookTrie();
phoneBook.add('Sy Le', '4084081111', '1422 BrandyBucks Way, San Jose, CA, 95121');
phoneBook.add('Doan Nguyen', '4084082222', '1422 BrandyBucks Way, San Jose, CA, 95121');
phoneBook.add('Peter Yang', '5105102222', '10230 Johnson Ave, San Jose, CA, 95014');

console.log('\nSearch by name being "Sy Le"');
console.log(JSON.stringify(phoneBook.search('name', 'Sy Le')));


console.log('\nSearch by address being "1422 BrandyBucks Way, San Jose, CA, 95121"');
console.log(JSON.stringify(phoneBook.search('address', '1422 BrandyBucks Way, San Jose, CA, 95121')));

console.log('\nSearch by phone being "5105102222"');
console.log(JSON.stringify(phoneBook.search('phone', '5105102222')));
=======
/*
  author : Sy Le
	www.synle.com
	
	Write a program for a phone book with people's name, address and phone number so that we can search by name , phone and address very quickly.
	
	
	This algorithm uses trie.
	
	Example:
	
	Search by name being "Sy Le"
	[{"name":"Sy Le","phone":"4084081111","address":"1422 BrandyBucks Way, San Jose, CA, 95121"}]

	Search by address being "1422 BrandyBucks Way, San Jose, CA, 95121"
	[{"name":"Sy Le","phone":"4084081111","address":"1422 BrandyBucks Way, San Jose, CA, 95121"},{"name":"Doan Nguyen","phone":"4084082222","address":"1422 BrandyBucks Way, San Jose, CA, 95121"}]

	Search by phone being "5105102222"
	[{"name":"Peter Yang","phone":"5105102222","address":"10230 Johnson Ave, San Jose, CA, 95014"}]
*/

/*
	helper class to store node
*/
function TrieNode(){
	var t = this;
	t.lookup = {};
	t.val = [];
}


/*
	phone book trie class
	
	contacts : is an array of contacts in the other they are in	
	trie : is the trie structure with keys as followed
		starting with @ is a name
		starting with # is a phone
		starting with $ is a address
*/
function PhoneBookTrie(){
	var t = this;
	var uuid = 1;
	
	t.contacts = [];
	t.trie = new TrieNode();//prefix $ for address, # for number, @ for name
	
	var insertTrieNode = function (key, val){
		var cur = t.trie;
		
		for (var i = 0; i < key.length; i++){
			//already there, then traverse down
			if (typeof cur.lookup[key[i]] == 'undefined'){
				cur.lookup[key[i]] = new TrieNode();
			}
			
			cur = cur.lookup[key[i]];
		}
		
		cur.val.push(uuid);
	}
	
	var searchTrieNode = function (key){
		var cur = t.trie;
		
		for (var i = 0; i < key.length; i++){
			if (typeof cur.lookup[key[i]] == 'undefined'){
				return [];//nothing like this
			}
			
			cur = cur.lookup[key[i]];
		}
		
		return cur.val;//return matching uuid		
	}
	
	t.add = function (name, phone, address){
		t.contacts[uuid] = {name : name, phone : phone, address : address};
		
		//work on the trie;
		//name
		name = '@' + name;
		insertTrieNode(name);
		
		
		//phone
		phone = '#' + phone;
		insertTrieNode(phone);
		
		//address
		address = '$' + address;
		insertTrieNode(address);
		
		
		uuid++;
	}
	
	t.search = function(category, searchTerm){
		switch(category.toLowerCase()){
			case 'name':
				searchTerm = '@' + searchTerm;
				break;
		
			case 'phone':
				searchTerm = '#' + searchTerm;
				break;
		
			case 'address':
				searchTerm = '$' + searchTerm;				
				break;
		}
		
		
		var matches = searchTrieNode(searchTerm); //uuid
		var ret = [];
		for (var i = 0; i < matches.length; i++){//lookup for contact from uuid for name
			ret.push(t.contacts[matches[i]]);
		}
		
		return ret;
	}
}

var phoneBook = new PhoneBookTrie();
phoneBook.add('Sy Le', '4084081111', '1422 BrandyBucks Way, San Jose, CA, 95121');
phoneBook.add('Doan Nguyen', '4084082222', '1422 BrandyBucks Way, San Jose, CA, 95121');
phoneBook.add('Peter Yang', '5105102222', '10230 Johnson Ave, San Jose, CA, 95014');

console.log('\nSearch by name being "Sy Le"');
console.log(JSON.stringify(phoneBook.search('name', 'Sy Le')));


console.log('\nSearch by address being "1422 BrandyBucks Way, San Jose, CA, 95121"');
console.log(JSON.stringify(phoneBook.search('address', '1422 BrandyBucks Way, San Jose, CA, 95121')));

console.log('\nSearch by phone being "5105102222"');
console.log(JSON.stringify(phoneBook.search('phone', '5105102222')));
>>>>>>> 6a4d59dcf6d2f3d5306ad7a0a80a37c11d62d2d4
