var fs = require('fs'), readline = require('readline');

var path = 'data/server.log';

var pattern = /Qit:\s+$/;
var endP = /^\|#]\s+$/;
var importMerge = /^Qit.RequestType=ImportMerge\s+$/;

// let's clean up the merge directory
fs.readdirSync('data/merge').forEach(function(fileName) {
	console.log('deleting '+'data/merge/'+fileName);
	fs.unlinkSync('data/merge/'+fileName);
});

var data = String(fs.readFileSync( path )).split('\n');
var qit = false;
var end = false;
var output = [];
var count = 0;
data.forEach(function(line){
	if(importMerge.test(line)){
		//console.log(line);
		qit = true, end = false, 		output = [];
		output.push(line);
		// increment the counter;
		count++;
		
	}else if(qit && endP.test(line)){
		//console.log(line);
		end = true, qit = false;
		// write to file
		var toFile = 'data/merge/' + count + '.txt';
		fs.writeFile(toFile, output.join('\n'), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log(toFile + " was saved!");
		    }
		}); 

	}else if(qit == true && end == false){
		output.push(line);
	}
});