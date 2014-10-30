var array = [44,2,34,6,7,34,4,4,2,3,6,8];

/**
 * Counting sort algorithm. It's with complexity O(n) but it's
 * correct for specific input.
 *
 * @public
 */
var countingSort = function () {

    /**
     * Gets the count of the elements into the input array
     *
     * @private
     * @param {array} array The input array
     * @returns {array} count The count of each element from the input array
     */
    function getCount(array) {
        var count = [],
            current;
        for (var i = 0; i < array.length; i += 1) {
            current = array[i];
            if (count[current] !== undefined) {
                count[current] += 1;
            } else {
                count[current] = 1;
            }
        }
        return count;
    }

    /**
     * Gets the count of the elements which are less than a given
     *
     * @private
     * @param {array} array The input array
     * @returns {array} less The count of the elements which are less than each element from the input
     */
    function getLessCount(array) {
        var less = [],
            last;
        less[0] = array[0] || 0;
        for (var i = 1; i < array.length; i += 1) {
            last = array[i - 1] || 0;
            less[i] = last + less[i - 1];
        }
        return less;
    }

    /**
     * Sorts the input array
     *
     * @private
     * @param {array} array Input which should be sorted
     * @param {array} less Count of the less elements for each element
     * @returns {array} result The sorted input
     */
    function sort(array, less) {
        var result = [],
            currentPositions = [],
            current,
            position;
        for (var i = 0; i < array.length; i += 1) {
            current = array[i];
            position = less[current];
            if (currentPositions[current] === undefined) {
                currentPositions[current] = position;
            }
            result[currentPositions[current]] = current;
            currentPositions[current] += 1;
        }
        return result;
    }

    /**
     * Sorts a given array
     *
     * @public
     * @param {array} array Array which should be sorted
     * @returns {array} array Sorted array
     */
    return function (array) {
        var less = getLessCount(getCount(array));
        return sort(array, less);
    };
}();

console.log(countingSort(array));
