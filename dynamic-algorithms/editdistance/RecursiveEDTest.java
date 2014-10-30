

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class RecursiveEDTest.
 *
 * @author  Zach Souser
 * @version Spring 2013
 */
public class RecursiveEDTest
{
    /**
     * Default constructor for test class RecursiveEDTest
     */
    RecursiveED r;
    public RecursiveEDTest()
    {
        r = new RecursiveED();
    }
    
    /**
     * Test the distance function for RecursiveED
     */

    @Test 
    public void distanceTest() {
        assertEquals(r.distance("dog","cat"),3);
        assertEquals(r.distance("this","that"),2);
        assertEquals(r.distance("abcdef","abcdeg"),1);
        assertEquals(r.distance("test","test"),0);
        // comment this next line out if you want to get a result in a reasonable amount of time
        assertEquals(r.distance("this is a long string that should take a while","this is another long string"),27);
    }
}
