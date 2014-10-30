
/**
 * Recursively calculate the distance between two strings
 * 
 * Distance represents the number of operations it would require to transform
 * the first string into the other string.
 * 
 * @author Zach Souser 
 * @version Spring 2013
 */
public class RecursiveED extends EditDistance
{
    /**
     * Calculate the distance. Initiates the recursive call.
     * 
     * @param a the original string
     * @param b the destination string
     * @return the distance
     */
    public int distance(final String a, final String b) {
        return distance(a,a.length(),b,b.length());
    }
    
    /**
     * Calculate the distance recursively
     * 
     * @param a the original string
     * @param b the destination string
     * @return the distance
     */
    
    private int distance(final String a, final int i, final String b, final int j) {
        int[] opt = new int[3];
        if (i == 0) return j * GAP_COST;
        if (j == 0) return i * GAP_COST;
        
        boolean same = a.charAt(i-1) == b.charAt(j-1);
        if (same) return distance(a,i-1,b,j-1);
        
        opt[MATCH] = distance(a,i-1,b,j-1) + SUB_COST;
        opt[INSERT] = distance(a,i,b,j-1) + GAP_COST;
        opt[DELETE] = distance(a,i-1,b,j) + GAP_COST;
        
        int min = opt[0];
        
        for (int k = 0; k < 3; k++) {
            if (opt[k] < min) min = opt[k]; 
        }
        return min;
    }
}
