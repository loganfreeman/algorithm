var fs = require('fs'), readline = require('readline');
var path ='data/update.sql';
var data = String(fs.readFileSync( path )).split('\n');

var output = [];

data.forEach(function(line){
	output.push(line.replace('{', '\\{'));
});
console.log(output.join('\n'));