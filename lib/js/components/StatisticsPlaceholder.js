/**
 * Utility object for statistics, like average, variance, etc.
 */

"use strict";

var StatisticsPlaceholderComponent = {

  setDecimal: function setDecimal(num, numOfDec) {
    var pow10s = Math.pow(10, numOfDec || 0);
    return numOfDec ? Math.round(pow10s * num) / pow10s : num;
  },

  average: function average(numArr, numOfDec) {
    var i = numArr.length,
        sum = 0;
    while (i--) {
      sum += numArr[i];
    }
    return quail.statistics.setDecimal(sum / numArr.length, numOfDec);
  },

  variance: function variance(numArr, numOfDec) {
    var avg = quail.statistics.average(numArr, numOfDec),
        i = numArr.length,
        v = 0;

    while (i--) {
      v += Math.pow(numArr[i] - avg, 2);
    }
    v /= numArr.length;
    return quail.statistics.setDecimal(v, numOfDec);
  },

  standardDeviation: function standardDeviation(numArr, numOfDec) {
    var stdDev = Math.sqrt(quail.statistics.variance(numArr, numOfDec));
    return quail.statistics.setDecimal(stdDev, numOfDec);
  }
};

module.exports = StatisticsPlaceholderComponent;