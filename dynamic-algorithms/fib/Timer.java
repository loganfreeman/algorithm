/**
 * Timer class
 * 
 * Times fib function calls
 * 
 * @author Zach Souser
 * @version Spring 2013
 * 
 */

class Timer {
    /**
     * Determine how long the function call takes
     * 
     * @param f the FibImplementation used
     * @param n the number
     * @return the time elapsed
     */
    
    public long howLong(FibImplementation f, int n) {
        long start = System.nanoTime();
        f.fib(n);
        long end = System.nanoTime();
        return end - start;
    }
}