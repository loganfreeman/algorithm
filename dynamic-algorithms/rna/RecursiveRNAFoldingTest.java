import java.util.TreeMap;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class DynamicRNAFoldingTest.
 *
 * @author Zach Souser
 * @version Spring 2013
 */
public class RecursiveRNAFoldingTest
{
    @Test
    public void testFolding() {
        RecursiveRNAFolding r = new RecursiveRNAFolding();
        
        TreeMap<Integer,Integer> expected = new TreeMap<Integer,Integer>();
        expected.put(0,16);
        expected.put(1,15);
        expected.put(2,11);
        expected.put(3,9);
        assertEquals(expected,r.secondaryStructure("ACCAGUCUGUCGUACGUCA"));
        
        expected = new TreeMap<Integer,Integer>();
        expected.put(0,14);
        expected.put(1,13);
        expected.put(4,12);
        expected.put(5,11);
        assertEquals(expected,r.secondaryStructure("ACCGUGUCUUGCAGUCCCA"));
        
        expected = new TreeMap<Integer,Integer>();
        expected.put(0,9);
        expected.put(1,7);
        assertEquals(expected,r.secondaryStructure("ACCCCGGGGU"));
        
        expected = new TreeMap<Integer,Integer>();
        expected.put(0,19);
        expected.put(2,17);
        expected.put(3,16);
        expected.put(4,14);
        expected.put(5,13);
        
        assertEquals(expected,r.secondaryStructure("ACGCGACGUCGGCUCAGCCUUGGAAA"));
        
        expected = new TreeMap<Integer,Integer>();
        expected.put(0,14);
        expected.put(1,13);
        expected.put(3,12);
        expected.put(5,11);
        
        assertEquals(expected,r.secondaryStructure("ACGUCGUCCGUCAGUCUGA"));
        
        expected = new TreeMap<Integer,Integer>();
        expected.put(0,13);
        expected.put(1,11);
        expected.put(2,10);
        expected.put(3,9);
        
        assertEquals(expected,r.secondaryStructure("AAAAAAUUUUUUAU"));
    }
}
