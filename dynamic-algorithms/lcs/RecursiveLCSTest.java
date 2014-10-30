

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class RecursiveLCSTest.
 *
 * @author  Zach Souser
 * @version Spring 2013
 */
public class RecursiveLCSTest
{
    @Test
    public void lcsTest() {
        RecursiveLCS lcs = new RecursiveLCS();
        assertEquals(lcs.lcs("dog","dig"),"dg");
        assertEquals(lcs.lcs("carpenter","carpet"),"carpet");
        assertEquals(lcs.lcs("abcdefg","bed"),"bd");
        assertEquals(lcs.lcs("girlfriend","bullied"),"lied");
    }
}
