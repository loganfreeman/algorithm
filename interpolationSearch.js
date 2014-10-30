/**
 * 
 * In each search step it calculates where in the remaining search space the sought item might be, based on the key values at the bounds of the search space and the value of the sought key, usually via a linear interpolation.
 * @param sortedArray
 * @param toFind
 * @returns
 */

function interpolationSearch(sortedArray, toFind) {
	// Returns index of toFind in sortedArray, or -1 if not found
	var low = 0;
	var high = sortedArray.length - 1;
	var mid;

	while (sortedArray[low] <= toFind && sortedArray[high] >= toFind) {
		mid = low + Math.floor(((toFind - sortedArray[low]) * (high - low)) / (sortedArray[high] - sortedArray[low])); // out of range is
															// possible here

		if (sortedArray[mid] < toFind)
			low = mid + 1;
		else if (sortedArray[mid] > toFind)
			// Repetition of the comparison code is forced by syntax
			// limitations.
			high = mid - 1;
		else
			return mid;
	}

	if (sortedArray[low] == toFind)
		return low;
	else
		return -1; // Not found
}

console.log(interpolationSearch([3, 9, 12, 34, 66, 89], 66));