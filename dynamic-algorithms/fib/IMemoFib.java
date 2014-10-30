/**
 * Iterative, memoized Fib calculator
 * 
 * @author Zach Souser
 * @version Spring 2013
 */
class IMemoFib implements FibImplementation {
    /** 
     * The memoized array
     */
    private long[] memo;
    
    /** 
     * Calculate the fib
     * 
     * @param n the number
     * @return the corresponding fib
     */
    
    public long fib(int n) {
        memo = new long[n+1];
        memo[0] = 0;
        memo[1] = 1;
        memo[2] = 1;
        for (int i = 2; i < n+1; i++) {
            memo[i] = memo[i-2] + memo[i-1];
        }
        return memo[n];
    }
}