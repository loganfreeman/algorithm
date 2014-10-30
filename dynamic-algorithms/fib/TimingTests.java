

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class TimingTests.
 *
 * @author  (your name)
 * @version (a version number or a date)
 */
public class TimingTests
{
    RMemoFib rm;
    IMemoFib im;
    IFib i;
    RFib r;
    Timer t;
    
    /**
     * Sets up the test fixture.
     *
     * Called before every test case method.
     */
    @Before
    public void setUp()
    {
        rm = new RMemoFib();
        im = new IMemoFib();
        i = new IFib();
        r = new RFib();
        t = new Timer();
    }

    /**
     * Tears down the test fixture.
     *
     * Called after every test case method.
     */
    @After
    public void tearDown()
    {
         System.out.println("-----------");
    }
    
    /**
     * Test recursive fib times, memoized and unmemoized
     */
    
    @Test
    public void testRecursive() {
        System.out.println(t.howLong(rm,5) +"-"+ t.howLong(r,5));
        System.out.println(t.howLong(rm,7) +"-"+ t.howLong(r,7));
        System.out.println(t.howLong(rm,10) +"-"+ t.howLong(r,10));
        System.out.println(t.howLong(rm,12) +"-"+ t.howLong(r,12));
        System.out.println(t.howLong(rm,20) +"-"+ t.howLong(r,20));
    }
    
    /**
     * Test iterateve fib times, memoized and unmemoized
     */
    
    @Test
    public void testIterative() {
        System.out.println(t.howLong(im,5) +"-"+ t.howLong(i,5));
        System.out.println(t.howLong(im,7) +"-"+ t.howLong(i,7));
        System.out.println(t.howLong(im,10) +"-"+ t.howLong(i,10));
        System.out.println(t.howLong(im,12) +"-"+ t.howLong(i,12));
        System.out.println(t.howLong(im,20) +"-"+ t.howLong(i,20));
    }
}
