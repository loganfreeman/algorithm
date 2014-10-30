
import java.util.List;
import java.util.ArrayList;
import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class TimingTests.
 *
 * @author  Zach Souser
 * @version Spring 2013
 */
public class TimingTests
{
    /**
     * The list of strings
     */
    
    List<String> strings;
    
    /**
     * Define the strings
     */
    
    @Before
    public void setUp() {
        strings = new ArrayList<String>();
        
        strings.add("the difference");
        strings.add("we don't know ");
        strings.add("test this string");
        strings.add("etherial");
    }
    
    /**
     * Run the timing tests
     */
    
    @Test
    public void runTimingTests() {
        System.out.println("Recursive: (Prepare to wait!)");
        for (TimingDataPoint p : generateDataPoints(strings,new RecursiveLCS())) {
            System.out.println(p);
        }
        
        System.out.println("Dynamic:");
        for (TimingDataPoint p : generateDataPoints(strings,new DynamicLCS())) {
            System.out.println(p);
        }
    }
    
    /**
     * Generate the data points for all strings on the given LCS implementation
     * 
     * @param   strings the list of strings
     * @param   lcs the lcs implementation
     */
    
    public static List<TimingDataPoint> generateDataPoints(List<String> strings, LongestCommonSubsequence lcs) {
        List<TimingDataPoint> list = new ArrayList<TimingDataPoint>();
        for (String s1 : strings) {
            for (String s2 : strings) {
                list.add(new TimingDataPoint(lcs.getClass(),s1,s2,lcs.time(s1,s2),lcs.lcs(s1,s2)));
            }
        }
        return list;
    }
    
    /**
     * Private data point class
     */
    
    private static class TimingDataPoint {
        Class<?> className;
        String string1, string2, lcs;
        long time;
        
        /** 
         * Constructor for TimingDataPoint
         * 
         * @param c the class
         * @param a the first string
         * @param b the second string
         * @param t the time elapsed
         * @param lcs the sequence result
         */
        
        public TimingDataPoint(Class<?> c, String a, String b, long t, String lcs) {
            className = c;
            string1 = a;
            string2 = b;
            this.lcs = lcs;
            time = t;
        }
        
        /**
         * toString
         */
        
        public String toString() {
            return "(" + className + ") - " + string1 + ", " + string2 + " - " + lcs + " -> " + time + " ms";
        }
    }
}
