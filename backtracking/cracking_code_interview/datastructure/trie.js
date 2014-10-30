function TrieNode(){
	var t = this;
	t.map = {};
	t.word = '';
	t.isEnd = false;
}

function Trie(){
	var t = this;
	var root = new TrieNode();
	
	t.root = root;
	t.add = function (word){
		var cur = root;
		
		for (var i = 0; i < word.length; i++){			
			if (typeof cur.map[word[i]] == 'undefined'){
				//populate if not found
				cur.map[word[i]] = new TrieNode();
				cur.map[word[i]].word = cur.word + word[i];
			}
			//traverse down
			cur = cur.map[word[i]];
		}
		
		cur.isEnd = true;//a complete word
		
		return t;
	}
	
	t.addList = function (wordList)
	{	
		for (var i = 0; i < wordList.length; i++){
			t.add(wordList[i]);
		}
		
		return t;
	}
	
	t.search = function (word){
		var cur = root;
		for (var i = 0; i < word.length; i++){	
			console.log(word[i], cur.map[word[i]]);
		
			if (typeof cur.map[word[i]] == 'undefined'){
				return false;
			}
			else{
				//traverse down
				cur = cur.map[word[i]];
			}
		}
		
		return true;
	}
	
	t.findLongestPrefix = function (word){
		var cur = root;
		var longestSoFar = '';
		for (var i = 0; i < word.length; i++){
			console.log(cur);
			if (typeof cur.map[word[i]] == 'undefined' || cur.isEnd){
				return cur.word;
			}
			else{
				longestSoFar += word[i];
				cur = cur.map[word[i]];
			}
		}
		
		return longestSoFar;
	}
}

var d = new Trie();
d.add('hello').add('ham').add('hammer').add('hockey');
d.addList(['are', 'area', 'base', 'cat', 'cater', 'children', 'basement']);
d.search('hello');
d.findLongestPrefix('basemex');//http://www.geeksforgeeks.org/longest-prefix-matching-a-trie-based-solution-in-java/