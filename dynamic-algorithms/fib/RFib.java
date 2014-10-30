class RFib implements FibImplementation {
    
    /** 
     * Calculate the fib
     * 
     * @param n the number
     * @return the corresponding fib
     */
    
    public long fib(int n) {
        if (n == 0) return 0;
        if (n < 2) return 1;
        return fib(n-1) + fib(n-2);
    }
}