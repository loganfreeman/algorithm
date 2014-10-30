/**
 * Say you have an array for which the ith element is the price of a given stock
 * on day i.
 * 
 * If you were only permitted to buy one share of the stock and sell one share
 * of the stock, design an algorithm to find the best times to buy and sell.
 * 
 * 
 * Find i and j that maximizes Aj – Ai, where i < j.
 */
var util = require("./listPrimes.js");
var buy, sell;
function getBestTime(stocks, sz) {
	var min = 0;
	var maxDiff = 0;
	buy = sell = 0;
	for ( var i = 0; i < sz; i++) {
		if (stocks[i] < stocks[min])
			min = i;
		var diff = stocks[i] - stocks[min];
		if (diff > maxDiff) {
			buy = min;
			sell = i;
			maxDiff = diff;
		}
	}
	console.log("buy at " + buy);
	console.log("sell at " + sell);
	console.log(stocks[sell] + " - " + stocks[buy]);
}
var stocks = [];
for(var i=0; i< 50; i++){
	stocks[i] = util.getRandomInt(100, 500);
}
getBestTime(stocks, stocks.length);
