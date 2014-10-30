
/**
 * Recursive LCS generator
 * 
 * @author Zach Souser
 * @version Spring 2013
 */
public class RecursiveLCS extends LongestCommonSubsequence
{
    /**
     * Generate the LCS recursively
     * 
     * @param a the first string
     * @param b the second string
     * @return the LCS
     */
    public String lcs(String a, String b) {
        if (a.length() == 0 || b.length() == 0) return "";
        if (a.charAt(a.length()-1) == b.charAt(b.length()-1)) {
            return lcs(a.substring(0,a.length()-1),b.substring(0,b.length()-1)) + a.charAt(a.length()-1);
        }
        String lcs1 = lcs(a,b.substring(0,b.length()-1));
        String lcs2 = lcs(a.substring(0,a.length()-1),b);
        if (lcs1.length() > lcs2.length()) return lcs1;
        return lcs2;
    }
}
