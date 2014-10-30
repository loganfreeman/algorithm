import java.util.TreeMap;
/**
 * Abstract class RNAFolding - 
 * Defines the timing mechanism, and declares the secondaryStructure
 * 
 * @author Zach Souser
 * @version Spring 2013
 */

public abstract class RNAFolding
{
    /**
     * Secondary Structure calculator
     * 
     * Calculates the maximum matching of an RNA sequence
     * 
     * @param inputSequence the RNA sequence
     * @return a TreeMap of matching pairs
     */
    
    public abstract TreeMap<Integer,Integer> secondaryStructure(String inputSequence);
    
    
    /**
     * Timing mechanism
     * 
     * @param rna the sequence to be evaluated
     * @return the elapsed time
     */
    
    public final long time(String rna) {
        long time = System.nanoTime();
        secondaryStructure(rna);
        return System.nanoTime() - time;
    }
}
