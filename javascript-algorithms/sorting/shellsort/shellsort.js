/**
 * Shellsort
 *
 * Shellsort uses the gaps 701, 301, 132, 57, 23, 10, 4, 1 and uses insertion sort
 * to sort the sub-arrays which match for the different gaps.
 */
var shellsort = (function () {

    var gaps = [701, 301, 132, 57, 23, 10, 4, 1];

    /**
     * Shellsort which uses the gaps in the lexical scope of the IIFE.
     *
     * @public
     * @param {array} array Array which should be sorted
     * @return {array} Sorted array
     */
    return function (array) {
        var gap, current;

        for (var k = 0; k < gaps.length; k += 1) {
            gap = gaps[k];
            for (var i = gap; i < array.length; i += gap) {
                current = array[i];
                for (var j = i; j >= gap && array[j - gap] > current; j -= gap) {
                    array[j] = array[j - gap];
                }
                array[j] = current;
            }
        }
        return array;
    };

}());
