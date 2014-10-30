<<<<<<< HEAD
/*
	author: Sy Le
	www.synle.com
	
	Given a word, append the fewest number of letters to it to convert it into a palindrome (string is identical to its reverse)
	
	Example:
	world :  worldlrow
	aaa :  aaa
	Step on no pets :  step on no pets
	Stressed :  stressedesserts
*/

/*
	helper to check if a string is a palindrome
*/
function isPalindrome(str){
	for (var i = 0; i < str.length / 2; i++){
		if (str[i] != str[str.length - 1 - i])
			return false;
	}
	
	return true;
}

/*
	reverse a string
*/
function reverseString(str){
	var newStr = '';
	for (var i = str.length - 1; i >= 0; i--){
		newStr += str[i];
	}
	
	return newStr;
}


/*generator for palindrome with the less number*/
function palindromeGenerator(str){
	//make it all to lower case
	str = str.toLowerCase();

	if (isPalindrome(str)){//already palindrome, then return it
		return str;
	}
	else{		
		var reverseStr = reverseString(str);
		
		//check to see the longest palindrome.
		var longestPalindrome = 0;//
		for (var i = 1; i < reverseStr.length && isPalindrome(reverseStr.substr(0, i)); i++){
			longestPalindrome++;
		}
		
		var nonPalindrome = str.substring(0, str.length - 1);
		var palindrome = reverseStr.substr(0, longestPalindrome);

		return nonPalindrome + palindrome + reverseString(nonPalindrome);
	}
}

console.log('world : ', palindromeGenerator('world'));
console.log('aaa : ', palindromeGenerator('aaa'));
console.log('Step on no pets : ', palindromeGenerator('Step on no pets'));
console.log('Stressed : ', palindromeGenerator('Stressed'));
=======
/*
  author: Sy Le
	www.synle.com
	
	Given a word, append the fewest number of letters to it to convert it into a palindrome (string is identical to its reverse)
	
	Example:
	world :  worldlrow
	aaa :  aaa
	Step on no pets :  step on no pets
	Stressed :  stressedesserts
*/

/*
	helper to check if a string is a palindrome
*/
function isPalindrome(str){
	for (var i = 0; i < str.length / 2; i++){
		if (str[i] != str[str.length - 1 - i])
			return false;
	}
	
	return true;
}

/*
	reverse a string
*/
function reverseString(str){
	var newStr = '';
	for (var i = str.length - 1; i >= 0; i--){
		newStr += str[i];
	}
	
	return newStr;
}


/*generator for palindrome with the less number*/
function palindromeGenerator(str){
	//make it all to lower case
	str = str.toLowerCase();

	if (isPalindrome(str)){//already palindrome, then return it
		return str;
	}
	else{		
		var reverseStr = reverseString(str);
		
		//check to see the longest palindrome.
		var longestPalindrome = 0;//
		for (var i = 1; i < reverseStr.length && isPalindrome(reverseStr.substr(0, i)); i++){
			longestPalindrome++;
		}
		
		var nonPalindrome = str.substring(0, str.length - 1);
		var palindrome = reverseStr.substr(0, longestPalindrome);

		return nonPalindrome + palindrome + reverseString(nonPalindrome);
	}
}

console.log('world : ', palindromeGenerator('world'));
console.log('aaa : ', palindromeGenerator('aaa'));
console.log('Step on no pets : ', palindromeGenerator('Step on no pets'));
console.log('Stressed : ', palindromeGenerator('Stressed'));
>>>>>>> 6a4d59dcf6d2f3d5306ad7a0a80a37c11d62d2d4
