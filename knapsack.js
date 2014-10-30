(function(Dynamic, undefined){

	(function(knapsack, undefined){
		var capacity = 0;
		var itemIndex = 0;
		var items = [[0, 0]]; // each item is reprensented as [value, weight]


		knapsack.__build__ = function(txt){
			var lines = txt.split('\n');
			// [knapsack_size][number_of_items]
			// [value_1] [weight_1]
			// ...
			var count = lines[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '').split(' '); 
			capacity = parseInt(count[0]);
			itemIndex = parseInt(count[1]);

			// get the number of edges
			var len = itemIndex;
			items = [[0, 0]];

			// i have known the number of the edges
			for (var i=1;i<=len;i++){
				// process each line
				var v = lines[i]
					.replace(/^\s\s*/, '')
					.replace(/\s\s*$/, '')
					.split(' ');
				
				items.push([parseInt(v[0]), parseInt(v[1])]);
			}
		};

		knapsack.solution0 = function(){
			var arr = [], i, x;

			// init the case when i = 0, arr[0, x]=case when w_0 <= W then v_0 else 0 end
			arr[0] = arr[0] || [];
			for (x=0;x<=capacity;x++){
				arr[0][x] = 0;
			}

			// recursion
			for (i=1;i<=itemIndex;i++){
				arr[i] = arr[i] || [];
				for (x=0;x<=capacity;x++){
					arr[i][x] = Math.max(
						arr[i-1][x], 
						((subCapacity = (x-items[i][1]))>=0)?
							(arr[i-1][subCapacity]+items[i][0]):
							0);
				}
			}

			return arr;
		};

		knapsack.solution1 = function(){

			var arr = [], i, x, itemWeight;
			for (x=0;x<=capacity;x++){arr[x]=0;}

			for (i=1;i<=itemIndex;i++){
				itemWeight = items[i][1];
				for (x=capacity;x>=itemWeight;x--){
					arr[x] = Math.max(arr[x], arr[x - itemWeight] + items[i][0]);
				}
			}

			return arr;
		};		
		
	}(Dynamic.knapsack = Dynamic.knapsack || {}));

}(window.Dynamic = window.Dynamic || {}));