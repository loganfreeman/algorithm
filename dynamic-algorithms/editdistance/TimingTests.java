import java.util.List;
import java.util.ArrayList;
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
    List<String> strings;
    
    @Before
    public void setUp() {
        strings = new ArrayList<String>();
        
        strings.add("value");
        strings.add("test");
        strings.add("tester");
        strings.add("retest");
        strings.add("two words");
        //strings.add("this is a long slow sentence");
        //strings.add("this is the opposite of multitasking");
        strings.add("value");
        strings.add("thim");
    }
    
    @Test
    public void runTimingTests() {
        System.out.println("Recursive: (Prepare to wait!)");
        for (TimingDataPoint p : generateDataPoints(strings,new RecursiveED())) {
            System.out.println(p);
        }
        
        System.out.println("Dynamic:");
        for (TimingDataPoint p : generateDataPoints(strings,new DynamicED())) {
            System.out.println(p);
        }
    }
    
    public static List<TimingDataPoint> generateDataPoints(List<String> strings, EditDistance ed) {
        List<TimingDataPoint> list = new ArrayList<TimingDataPoint>();
        for (String s1 : strings) {
            for (String s2 : strings) {
                list.add(new TimingDataPoint(ed.getClass(),s1,s2,ed.time(s1,s2),ed.distance(s1,s2)));
            }
        }
        return list;
    }
    
    private static class TimingDataPoint {
        Class<?> className;
        String string1, string2;
        int distance;
        long time;
        public TimingDataPoint(Class<?> c, String a, String b, long t, int dist) {
            className = c;
            string1 = a;
            string2 = b;
            distance = dist;
            time = t;
        }
        
        public String toString() {
            return "(" + className + ") - " + string1 + ", " + string2 + " - " + distance + " -> " + time + " ms";
        }
    }
}
