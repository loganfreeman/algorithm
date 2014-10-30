

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class RFibTest.
 *
 * @author Zach Souser
 * @version Spring 2013
 */

public class RFibTest
{
    @Test
     public void fibTest() {
        RFib f = new RFib();
        assertEquals(f.fib(3),2);
        assertEquals(f.fib(8),21);
        assertEquals(f.fib(12),144);
        assertEquals(f.fib(20),6765);
        assertEquals(f.fib(32),2178309L);
    }
}