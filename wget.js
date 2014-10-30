var request = require("request");
var fs = require('fs');

var fs = require('fs'), request = require('request');

var url = 'http://ivaynberg.github.io/select2/images/flags/';

var download = function(uri, filename, callback) {
	request.head(uri, function(err, res, body) {

		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

download('https://www.google.com/images/srpr/logo3w.png', 'data/img/google.png', function() {
	console.log('done');
});

var data = String(fs.readFileSync( 'data/url.txt' )).split('\n');

data.forEach(function(line){
	var parts = line.split(' ');
	parts = parts[1].split('/');
	var fileName = parts.pop();
	download(url + fileName, 'data/img/'+ fileName, function(){console.log(fileName)});
})