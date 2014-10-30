import java.util.TreeMap;
/**
 * Determine the maximum folding of an RNA sequence using
 * recursion.
 * 
 * @author Zach Souser
 * @version Spring 2013
 */
public class RecursiveRNAFolding extends RNAFolding
{
    /**
     * Find the secondary structure by initiating the recursive call
     * 
     * @param inputSequence the RNA sequence
     * @return the TreeMap maximum matching
     */
    
    public TreeMap<Integer,Integer> secondaryStructure(String inputSequence) {
        TreeMap<Integer,Integer> map = new TreeMap<Integer,Integer>();
        return doSecondaryStructure(map,inputSequence,0,inputSequence.length()-1);
        //return map;
    }
    
    /**
     * Find the secondary structure recursively
     * 
     * @param inputSequence the RNA sequence
     * @return the TreeMap maximum matching
     */
    public TreeMap<Integer,Integer> doSecondaryStructure(TreeMap<Integer,Integer> map, 
                                            String inputSequence, int i, int j) {
        if (j - i < 5) return map;
        TreeMap<Integer,Integer> max = doSecondaryStructure(map,inputSequence,i,j-1);
       
        for (int k = i; k < j-5; k++) {
            if (isMatch(inputSequence,k,j)) {
                TreeMap<Integer,Integer> copy = new TreeMap<Integer,Integer>(map);
                copy.put(k,j);
                TreeMap<Integer,Integer> result = doSecondaryStructure(copy,inputSequence,i,k-1);
                result.putAll(doSecondaryStructure(copy,inputSequence,k+1,j-1));
                if (result.size() > max.size()) {
                    max = result;
                }
            }
        }
        return max;
    }
    
    /**
     * Determine whether the character in position i matches the character in position j
     * 
     * @param inputSequence the sequence in consideration
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
