
/**
 * Abstract class EditDistance - define timing mechanism and class variables.
 * 
 * @author Zach Souser
 * @version Spring 2013
 */
public abstract class EditDistance {
    /**
     * The cost of a gap operations (adding/removing a letter)
     */
    public static int GAP_COST = 1;
    /**
     * The cost of swapping a character for another
     */
    
    public static int SUB_COST = 1;
    
    public static int MATCH = 0;
    public static int INSERT = 1;
    public static int DELETE = 2;
    
    
    public abstract int distance(final String a, final String b);
    public long time(final String a, final String b) {
        long time = System.nanoTime();
        distance(a,b);
        return System.nanoTime() - time;
    }
}
       