

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class TimingTests.
 * Compare times for executing Dynamic and Recursive RNA secondary structure
 * @author  Zach Souser
 * @version Spring 2013
 */
public class TimingTests
{
    /** 
     * The array of strings to be evaluated
     */
    
    String[] strings;
    
    /**
     * Set up the test
     */
    
    @Before 
    public void setUp() {
        strings = new String[5];
        strings[0] = "AUGUAUGUGUAUCUGUAUCUGUCUGUUGGA"; // Too long! AGGGGUCUGUGAUCUGUGGGAUCUGUCUAGUCGU";
        strings[1] = "AUUUUUGUGUAGUCUCUGUCAGUCUUUAAGCG";
        strings[2] = "AUCGUCCCCUUUUUUUUU";
        strings[3] = "AUCUGUCUGUGUUCUAUGUCUGUAUCUGUCUGUGUUUGCAUCG";
        strings[4] = "AAAAUUCCCGGGGUUUCCAAAGGGUUUCCA";
    }
    
    /**
     * Test timings and show data
     */
     
    @Test
    public void test() {
        RecursiveRNAFolding r = new RecursiveRNAFolding();
        DynamicRNAFolding d = new DynamicRNAFolding();
        for (String s : strings) {
            System.out.println(s + " - Dynamic:" + d.time(s) / 1000 + 
                                " - Recursive:" + r.time(s) / 1000 + 
                                " - Matching: " + r.secondaryStructure(s));
        }
    }
}
