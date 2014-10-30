

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class DynamicLCSTest.
 *
 * @author  Zach Souser
 * @version Spring 2013
 */
public class DynamicLCSTest
{
    @Test
    public void lcsTest() {
        DynamicLCS lcs = new DynamicLCS();
        assertEquals(lcs.lcs("dog","dig"),"dg");
        assertEquals(lcs.lcs("carpenter","carpet"),"carpet");
        assertEquals(lcs.lcs("abcdefg","bed"),"bd");
        assertEquals(lcs.lcs("girlfriend","bullied"),"lied");
    }
}


