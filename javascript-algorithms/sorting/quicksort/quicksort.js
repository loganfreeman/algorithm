var array = [3,4,7,3,3,5,8,3,34,3,7,9];

/**
 * The quicksort algorithm. It's complexity is O(nlog n).
 *
 * @public
 */
var quickSort = (function () {

    /**
     * Partitions given subarray.
     *
     * @private
     * @param {array} array Input array
     * @param {number} left The start of the subarray
     * @param {number} right The end of the subarray
     */
    function partition(array, left, right) {
        var cmp = array[right - 1],
            minEnd = left,
            maxEnd;
        for (maxEnd = left; maxEnd < right - 1; maxEnd += 1) {
            if (array[maxEnd] <= cmp) {
                swap(array, maxEnd, minEnd);
                minEnd += 1;
            }
        }
        swap(array, minEnd, right - 1);
        return minEnd;
    }

    /**
     * Swap the places of two elements
     *
     * @private
     * @param {array} array The array which contains the elements
     * @param {number} i The index of the first element
     * @param {number} j The index of the second element
     * @returns {array} array The array with swaped elements
     */
    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    }
   
    /**
     * Sorts given array.
     *
     * @private
     * @param {array} array Array which should be sorted
     * @param {number} left The start of the subarray which should be handled
     * @param {number} right The end of the subarray which should be handled
     * @returns {array} array Sorted array
     */ 
    function quickSort(array, left, right) {
        if (left < right) {
            var p = partition(array, left, right);
            quickSort(array, left, p);
            quickSort(array, p + 1, right);
        }
        return array;
    }

    /**
     * Calls the quicksort function with it's initial values.
     *
     * @public
     * @param {array} array The input array which should be sorted
     * @returns {array} array Sorted array
     */
    return function (array) {
        return quickSort(array, 0, array.length);
    };
}());

console.log(quickSort(array));
