
var Stack = require ('./datastructure.js').Stack;

function parseXml(str){
	var ret = {};
	var lines = str.split('\n');
	
	for (var i = 0; i < lines.length; i++){
	}
	
	return ret;
}

parseXml('<tests>\n'+
'<test name="a">Is the sun actually hot?</test>\n' + 
'<test name="b" />\n' + 
'</tests>');