function compress(list){
	var start = 999999999999;
	var end = 0;
	
	//find the start and the end
	for (var i = 0; i < list.length; i++){
		if (start > list[i])
			start = list[i];
		if (end < list[i])
			end = list[i];
	}
	
	var bit = [];
	for (var i = 0; i < end; i++){
		bit.push('0');
	}

	console.log(start, end);
	
	//doing the bit operation;
	for (var i = 0; i < list.length; i++){
		bit[list[i] - start] = '1';
	}
	bit = bit.slice(0, bit.lastIndexOf('1') + 1);
	
	//calculate the bit
	console.log(bit);
	var retBit = bit.join('');
	var reversedBit = bit.reverse();
	var dec = 0;
	
	for (var i = 0; i < reversedBit.length; i++){
		if (reversedBit[i] == 1){
			dec += Math.pow(2, i);
		}
	}
	
	//attempted at compressing non zero
	
	
	return {
		start : start,
		bit : retBit,
		dec : dec
	};
}

function decompressFromDec(start, dec){
	var ret = [];
	
	var bit = dec.toString(2);//reversed bit
	
	
	for (var i = 0; i < bit.length; i++){
		if (bit[i] == 1){
			ret.push(start + i);
		}
	}
	
	return ret;
}


function decompressFromBit(start, bit){
	var ret = [];
	
	for (var i = 0; i < bit.length; i++){
		if (bit[i] == 1){
			ret.push(start + i);
		}
	}
	
	return ret;
}


var list;
list = [4,6,7,18,23,32,34,63,65,78,79,123,323,324,423,432,489,534,564,675,678,768,827,861,876,1000,1230,1523,1837,2000,2500,3000,6758,234];
//list = [1000, 2000, 3000, 5];
//list = [5,10,2,1];
console.log(list);

//compress
var comp = compress(list);
console.log(comp);


//decompress
console.log('decompressFromBit', decompressFromBit(comp.start, comp.bit));
//console.log('decompressFromDec', decompressFromDec(comp.start, comp.dec));
