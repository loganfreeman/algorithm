
/**
 * 
 * Examples: set[] = {3, 34, 4, 12, 5, 2}, sum = 9
   Output:  True  //There is a subset (4, 5) with sum 9
 * @param set
 * @param n
 * @param sum
 * @returns
 */
function isSubsetSum(set, n, sum)
{
   // Base Cases
   if (sum == 0)
     return true;
   if (n == 0 && sum != 0)
     return false;
 
   // If last element is greater than sum, then ignore it
   if (set[n-1] > sum)
     return isSubsetSum(set, n-1, sum);
 
   /* else, check if sum can be obtained by any of the following
      (a) including the last element
      (b) excluding the last element   */
   return isSubsetSum(set, n-1, sum) || isSubsetSum(set, n-1, sum-set[n-1]);
}

var result = isSubsetSum([3, 34, 4, 12, 5, 2], 6, 9);


console.log(result);