/**
 * Calculate the fib iteratively with no memoization.
 * 
 * @author Zach Souser
 * @version Spring 2013
 */
class IFib implements FibImplementation {

    /** 
     * Calculate the fib
     * 
     * @param n the number
     * @return the corresponding fib
     */
    
    public long fib(int n) {
        int first = 0;
        int second = 1;
        for (int i = 1; i < n; i++) {
            int temp = first;
            first = second;
            second = first + temp;
        }
        return second;
    }
}