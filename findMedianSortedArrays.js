/*
 * The median is the numerical value separating the higher half of a data sample, a population, or a probability distribution, from the lower half.
 * First, we choose Ai and Bj (the middle elements of A and B) where i and j are defined as m/2 and n/2. We made an observation that if Ai <= Bj, then the median must be somewhere between Ai and Bj (inclusive). Therefore, we could dispose a total of i elements from left of Ai and a total of n-j-1 elements to the right of Bj. 
 * The number of elements being disposed from each array must be the same.
 * k = min(i, n-j-1) when Ai <= Bj.                   <--- 1(a)
   k = min(m-i-1, j) when Ai > Bj.                    <--- 1(b)
   
   	k = min(i-1, n-j-1) when Ai <= Bj and m is even.   <--- 2(a)
	k = min(i, n-j-1)   when Ai <= Bj and m is odd.    <--- 2(b)
	k = min(m-i-1, j-1) when Ai > Bj  and n is even.   <--- 2(c)
	k = min(m-i-1, j)   when Ai > Bj  and n is odd.    <--- 2(d)
 */
/*
 * 
 * c is an array of integers
 */
var slice = [].slice;
function findMedianBaseCase(med, c, n) {
  if (n == 1)
    return (med+C[0])/2.0;

  if (n % 2 == 0) {
    var a = C[n/2 - 1], b = C[n/2];
    if (med <= a)
      return a;
    else if (med <= b)
      return med;
    else /* med > b */
      return b;
  } else {
    var a = C[n/2 - 1], b = C[n/2], c = C[n/2 + 1];
    if (med <= a)
      return (a+b) / 2.0;
    else if (med <= c)
      return (med+b) / 2.0;
    else /* med > c */
      return (b+c) / 2.0;
  }
}
/**
 * c is an array of integer
 * @param med1
 * @param med2
 * @param c
 * @param n
 */
function findMedianBaseCase2(med1, med2, c, n) {
  if (n % 2 == 0) {
    var a = (((n/2-2) >= 0) ? C[n/2 - 2] : INT_MIN);
    var b = C[n/2 - 1], c = C[n/2];
    var d = (((n/2 + 1) <= n-1) ? C[n/2 + 1] : INT_MAX);
    if (med2 <= b)
      return (b+max(med2,a)) / 2.0;
    else if (med1 <= b)
      return (b+min(med2,c)) / 2.0;
    else if (med1 >= c)
      return (c+min(med1,d)) / 2.0;
    else if (med2 >= c)
      return (c+max(med1,b)) / 2.0;
    else  /* a < med1 <= med2 < b */
      return (med1+med2) / 2.0;
  } else {
    var a = C[n/2 - 1], b = C[n/2], c = C[n/2 + 1];
    if (med1 >= b)
      return min(med1, c);
    else if (med2 <= b)
      return max(med2, a);
    else  /* med1 < b < med2 */
      return b;
  }
}

function findMedianSingleArray(A, n) {
  return ((n%2 == 1) ? A[Math.floor(n/2)] : (A[n/2-1]+A[n/2])/2.0);
}

function findMedianSortedArrays(A, m, B, n) {
  if (m == 0)
    return findMedianSingleArray(B, n);
  else if (n == 0)
    return findMedianSingleArray(A, m);
  else if (m == 1)
    return findMedianBaseCase(A[0], B, n);
  else if (n == 1)
    return findMedianBaseCase(B[0], A, m);
  else if (m == 2)
    return findMedianBaseCase2(A[0], A[1], B, n);
  else if (n == 2)
    return findMedianBaseCase2(B[0], B[1], A, m);

  var i = Math.floor(m/2), j = Math.floor(n/2), k;
  if (A[i] <= B[j]) {
    k = ((m%2 == 0) ? Math.min(i-1, n-j-1) : Math.min(i, n-j-1));    
    return findMedianSortedArrays(slice.call(A, K), m-k, B, n-k);
  } else {
    k = ((n%2 == 0) ? Math.min(m-i-1, j-1) : Math.min(m-i-1, j));
    return findMedianSortedArrays(A, m-k, slice.call(B, k), n-k);
  }
}
var A = [1, 3, 5, 8, 12, 16, 23];
var B = [2, 5, 8, 13, 14, 16];
var m = findMedianSingleArray(A, A.length);
console.log(m);
var n = findMedianSingleArray(B, B.length);
console.log(n);
