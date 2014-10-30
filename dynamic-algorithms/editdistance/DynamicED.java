
/**
 * Dynamically calculate the distance between two strings
 * 
 * Distance represents the number of operations it would require to transform
 * the first string into the other string.
 * 
 * @author Zach Souser 
 * @version Spring 2013
 */
public class DynamicED extends EditDistance
{
    /**
     * The memoized array for calculations
     */
    
    int[][] memo;
  
    /**
     * Calculate the distance using dynamic programming.
     * 
     * @param a the original string
     * @param b the destination string
     * @return the distance
     */
    
    public int distance(final String a, final String b) {
        int[][] memo = new int[a.length()+1][b.length()+1];
        int[] opt = new int[3];
        for (int i = 1; i < a.length(); i++) {
            memo[i][0] = i;
        }
        for (int i = 1; i < b.length(); i++) {
            memo[0][i] = i;
        }
        memo[0][0] = 0;
    
        for (int i = 1; i < a.length()+1; i++) {
            for (int j = 1; j < b.length()+1; j++) {
                opt[MATCH] = memo[i-1][j-1] + ((a.charAt(i-1) == b.charAt(j-1)) ? 0 : SUB_COST);
                opt[INSERT] = memo[i][j-1] + GAP_COST;
                opt[DELETE] = memo[i-1][j] + GAP_COST;
                
                memo[i][j] = opt[0];
                for (int k = 1; k < 3; k++) {
                    if (opt[k] < memo[i][j]) {
                        memo[i][j] = opt[k];
                    }
                }
            }
        }
        return memo[a.length()][b.length()];
    }
}
