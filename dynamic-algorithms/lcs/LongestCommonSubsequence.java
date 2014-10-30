
/**
 * Abstract class LongestCommonSubsequence - 
 * 
 * Defines timing mechanism for a common LCS implementation
 * 
 * @author (your name here)
 * @version (version number or date here)
 */
public abstract class LongestCommonSubsequence
{
    /**
     * LCS generator
     * 
     * @param a the first string
     * @param b the second string
     * @return the LCS
     */
    
    abstract String lcs(String a, String b);
    
    /**
     * Time the LCS calculation
     * 
     * @param a the first string
     * @param b the scond string
     * @return the time elapsed
     */
    long time(String a, String b) {
        long time = System.nanoTime();
        lcs(a,b);
        return System.nanoTime() - time;
    }
}
