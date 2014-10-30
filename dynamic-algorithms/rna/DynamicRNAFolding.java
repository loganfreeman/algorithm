import java.util.TreeMap;
/**
 * Determine the maximum folding of an RNA sequence using
 * dynamic programming.
 * 
 * @author Zach Souser
 * @version Spring 2013
 */
public class DynamicRNAFolding extends RNAFolding
{
    /**
     * The memoized array of folding values
     */
    
    public int[][] memo;
    
    /**
     * The trace table of possible TreeMaps
     */
    
    public TreeMap<Integer,Integer>[][] trace;
    
    /**
     * Find the secondary structure using dynamic programming
     * 
     * @param inputSequence the sequence in consideration
     * @return the TreeMap of the secondary structure
     */
    public TreeMap<Integer,Integer> secondaryStructure(String inputSequence) {
        memo = new int[inputSequence.length()][inputSequence.length()];
        // Unsafe operation here, but it still compiles.
        trace = new TreeMap[inputSequence.length()][inputSequence.length()];
        for (int i = 0; i < trace.length; i++) {
            for (int j = 0; j < trace.length; j++) {
                trace[i][j] = new TreeMap<Integer,Integer>();
            }
        }
        for (int k = 4; k < inputSequence.length(); k++) {
            for (int i = 0; i < inputSequence.length() - k; i++) {
                int j = i + k;
                memo[i][j] = memo[i][j-1];
                trace[i][j] = trace[i][j-1];
                int value = 0;
                for (int t = i; t < j - 5; t++) {
                    if (isMatch(inputSequence,t,j)) {
                        TreeMap<Integer,Integer> map = new TreeMap<Integer,Integer>();
                        if (t == 0) {
                            map.put(t,j);
                            map.putAll(trace[t+1][j-1]);
                            value = 1+memo[t+1][j-1];
                        }
                        else {
                            map.put(t,j);
                            map.putAll(trace[i][t-1]);
                            map.putAll(trace[t+1][j-1]);
                            value = 1 + memo[i][t-1] + memo[t+1][j-1];
                        }
                        if (value > memo[i][j]) {
                            memo[i][j] = value;
                            trace[i][j] = map;
                        }
                    }
                }
            }
        }
        return trace[0][inputSequence.length()-1];
    }
    
    /**
     * Is the character in position i a match for the character in position j?
     * 
     * Returns true of A-U or C-G match is found
     * 
     * @param inputSequence the string in consideration
     * @param i the ith position
     * @param j the jth position
     * @return true if there is a match, false otherwise
     */
    
    private boolean isMatch(String inputSequence, int i, int j) {
        return ((inputSequence.charAt(i) == 'U' && inputSequence.charAt(j) == 'A' ||
            inputSequence.charAt(i) == 'C' && inputSequence.charAt(j) == 'G' ||
            inputSequence.charAt(j) == 'U' && inputSequence.charAt(i) == 'A' ||
            inputSequence.charAt(j) == 'C' && inputSequence.charAt(i) == 'G'));
    }
}
