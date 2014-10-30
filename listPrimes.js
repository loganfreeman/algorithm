function listPrimes(nPrimes) {
	var primes = [];
	for ( var n = 2; nPrimes > 0; n++) {
		if (isPrime(n)) {
			primes.push(n);
			--nPrimes;
		}
	}
	return primes;
}

/**
 * 
 * 
 * Sieve of Eratosthenes
 *  It does so by iteratively marking as composite (i.e. not prime) the multiples of each prime, starting with the multiples of 2.
 *  
 *  The sieve of Eratosthenes is one of the most efficient ways to find all of the smaller primes. 
 * @param max
 * @returns {Array}
 */

function listPrimesFast( max ) {
    var primes = [];
    var sieve = new Array( max );
    for( var i = 0;  i < max;  i++ ) {
        sieve[i] = true;
    }
    for( var p = 2;  p < max;  p++ ) {
        if( sieve[p] ) {
            // p is prime, save it and mark p*2, p*3, etc. as non-prime
            primes.push( p );
            for( var t = p * 2;  t < max;  t += p ) {
                sieve[t] = false;
            }
        }
    }
    return primes;
}


/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isPrime(n) {
	var max = Math.sqrt(n);
	for ( var i = 2; i <= max; i++) {
		if (n % i === 0)
			return false;
	}
	return true;
}

function generatebigPrime(min,max){
	var ret = getRandomInt(min, max);
	while(!isPrime3(ret)){
		ret = getRandomInt(min, max);
	}
	return ret;
}

// This version has the fewest lines of code - but is very slow.
// It checks if n is dividible by every integer 2, 3, 4, 5 ...
// up to sqrt(n)

function isPrime1(n) {
	if (isNaN(n) || !isFinite(n) || n % 1 || n < 2)
		return false;
	var m = Math.sqrt(n);
	for ( var i = 2; i <= m; i++)
		if (n % i == 0)
			return false;
	return true;
}

// The next version is better: it checks the divisor 2 separately;
// then, it proceeds to check odd divisors only, from 3 up to sqrt(n).
// At most half of the numbers between 3 and sqrt(n) are checked.

function isPrime2(n) {
	if (isNaN(n) || !isFinite(n) || n % 1 || n < 2)
		return false;
	if (n % 2 == 0)
		return (n == 2);
	var m = Math.sqrt(n);
	for ( var i = 3; i <= m; i += 2) {
		if (n % i == 0)
			return false;
	}
	return true;
}

// Even better: first, check if n is divisible by 2 or 3.
// Then check only the odd divisors that are not multiples of 3.
// At most 1/3 of divisors under sqrt(n) are checked;
// other divisors are multiples of either 2 or 3 anyway.

function isPrime3(n) {
	if (isNaN(n) || !isFinite(n) || n % 1 || n < 2)
		return false;
	if (n % 2 == 0)
		return (n == 2);
	if (n % 3 == 0)
		return (n == 3);
	var m = Math.sqrt(n);
	for ( var i = 5; i <= m; i += 6) {
		if (n % i == 0)
			return false;
		if (n % (i + 2) == 0)
			return false;
	}
	return true;
}

var primeUntil = {
	listPrimes : listPrimes,
	isPrime : isPrime,
	listPrimesFast: listPrimesFast,
	generatebigPrime: generatebigPrime,
	getRandomInt: getRandomInt
}


//console.log(isPrime2(31));
//console.log(generatebigPrime(2 <<27, 2<<28));
module.exports = primeUntil;