function SumUpTo0(a){
	var hDiff = {};
	console.log(a);
	for (var i = 0; i < a.length; i++){
		if (typeof hDiff[a[i]]  != 'undefined'){
			console.log(a[hDiff[a[i]]], a[i]);
		}
	
		hDiff[- a[i]] = i;
	}
}

SumUpTo0([0,-5,-10,5,10,5, 0]);