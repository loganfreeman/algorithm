/**
 * Run-length encoding.
 * The idea of this algorithm is to remove the usless zeros and
 * give us representation of string in binary which in which the
 * zeros will be stripped and replaced with their count.
 */
var runLengthEncoding = (function () {

  'use strict';

  /**
   * Convers a given string to sequence of numbers
   * This takes O(n).
   */
  function convertToAscii(str) {
    var result = '',
        currentChar = '',
        i = 0;
    for (; i < str.length; i += 1) {
      currentChar = str[i].charCodeAt(0).toString(2);
      if (currentChar.length < 8) {
        while (8 - currentChar.length) {
          currentChar = '0' + currentChar;
        }
      }
      result += currentChar;
    }
    return result;
  }

  /**
   * Encodes the binary string to run-length encoding.
   * Takes O(n^2).
   */
  function runLength(vector) {
    var result = '',
        zeros = 0,
        zerosTemp = '',
        wordLength = 0,
        i = 0;
    for (; i < vector.length; i += 1) {
      if (vector[i] === '0') {
        zeros += 1;
      } else {
        zerosTemp = zeros.toString(2);
        wordLength = zerosTemp.length - 1;
        while (wordLength) {
          result = result + '1';
          wordLength -= 1;
        }
        result += '0' + zerosTemp;
        zeros = 0;
      }
    }
    return result;
  }

  /**
   * Accepts a string and returns it's run-length encoded binary representation.
   * Takes O(n^2).
   */
  return function (str) {
    var asciiString = convertToAscii(str);
    return runLength(asciiString);
  };

}());