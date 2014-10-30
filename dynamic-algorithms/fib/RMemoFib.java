/**
 * Recursive, memoized Fib calculator
 * 
 * @author Zach Souser
 * @version Spring 2013
 */

class RMemoFib implements FibImplementation {
    /** 
     * The memoized array
     */
    
    private long[] memo;
    
    /** 
     * Calculate the fib. Initiates the recursive call
     * 
     * @param n the number
     * @return the corresponding fib
     */
    
    public long fib(int n) {
        memo = new long[n+1];    
        memo[0] = 0;
        memo[1] = 1;
        memo[2] = 1;
        return fibHelper(n);
    }
    
    /** 
     * Calculate the fib
     * 
     * @param n the number
     * @return the corresponding fib
     */
    
    
    private long fibHelper(int n) {
        if (n == 0) return 0;
        if (memo[n] != 0) return memo[n];
        memo[n] = fibHelper(n-2) + fibHelper(n-1);
        return memo[n];
    }
}