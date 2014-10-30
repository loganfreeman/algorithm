

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
public class DynamicEDTest
{
    /**
     * Default constructor for test class RecursiveEDTest
     */
    DynamicED d;
    public DynamicEDTest()
    {
        d = new DynamicED();
    }

    /**
     * Test the distance function of DynamicED
     */
    @Test 
    public void distanceTest() {
        assertEquals(d.distance("dog","cat"),3);
        assertEquals(d.distance("this","that"),2);
        assertEquals(d.distance("somebody","something else"),8);
        assertEquals(d.distance("test","test"),0);
        assertEquals(d.distance("this is a long string that should take a while","this is another long string"),27);
    }
}
