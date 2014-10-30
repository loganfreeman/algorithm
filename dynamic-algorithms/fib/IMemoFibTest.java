

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class IMemoFibTest.
 *
 * @author Zach Souser
 * @version Spring 2013
 */

public class IMemoFibTest
{
    @Test
     public void fibTest() {
        IMemoFib f = new IMemoFib();
        assertEquals(f.fib(3),2);
        assertEquals(f.fib(8),21);
        assertEquals(f.fib(12),144);
        assertEquals(f.fib(20),6765);
        assertEquals(f.fib(32),2178309L);
    }
}