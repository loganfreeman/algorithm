
/**
 * Dynamic Programming LCS generator
 * 
 * @author Zach Souser 
 * @version Spring 2013
 */
public class DynamicLCS extends LongestCommonSubsequence
{
    /**
     * Generate the LCS dynamically
     * 
     * @param a the first string
     * @param b the second string
     * @return the LCS
     */
    public String lcs(String a, String b) {
        String[][] memo = new String[a.length()+1][b.length()+1];
        String retVal = "";
        if (a.length() == 0 || b.length() == 0) return "";
        for (int i = 0; i < memo.length; i++) {
            memo[i][0] = "";
        }
        for (int i = 0; i < memo[0].length; i++) {
            memo[0][i] = "";
        }
        for (int i = 1; i < memo.length; i++) {
            for (int j = 1; j < memo[i].length; j++) {
                if (a.charAt(i-1) == b.charAt(j-1)) {
                    memo[i][j] = memo[i-1][j-1]+a.charAt(i-1);
                } else {
                    String up = memo[i-1][j];
                    String back = memo[i][j-1];
                    if (up.length() < back.length()) memo[i][j] = back;
                    else memo[i][j] = up;
                    
                }
            }
        }
        return memo[memo.length-1][memo[0].length-1];
    }
}
