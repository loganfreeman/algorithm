var fs = require('fs'), readline = require('readline');
var path = 'data/view.sql';
var data = String(fs.readFileSync(path)).split('<VIEW>');

var output = [];
var toFile = 'data/createView.sql';

var toFakeFile = 'data/createFakeView.sql';

var originalDDL = 'data/originalView.sql';

try{
	fs.unlinkSync(toFile);
}catch(e){
	
}

try{
	fs.unlinkSync(originalDDL);
}catch(e){
	
}

fs.writeFile(toFakeFile, '', function(){console.log('done')})


function fakeReplace(str, substr, newstr) {
    return str.split(substr).join(newstr);
}


var template = "SET DEFINE OFF\n" +
		"SET serveroutput ON\n\
DECLARE\n\
BEGIN\n\
 Execute immediate '<VIEW_DDL>';\n\
EXCEPTION\n\
WHEN OTHERS THEN\n\
  DBMS_OUTPUT.PUT_LINE (SQLCODE || ' ' || SQLERRM);\n\
  ROLLBACK;\n\
END;\n\
/\n\n";

data.forEach(function(line) {
	fs.appendFile(originalDDL, line);
    line = line.replace(/\n\s*\n/g, '\n');

	var regex = new RegExp('MASTER_B', "g");

	line = line.replace(regex, "SCHENG");
	line = line.replace(new RegExp("'", "g"), "''");

	var ddl = template.replace(new RegExp('<VIEW_DDL>'), line);
	//console.log(ddl);
	
	var fakeDDL = fakeReplace(template, '<VIEW_DDL>', line);
	fs.appendFile(toFile, ddl, function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        //console.log(toFile + " was saved!");
	    }
	}); 
	
	fs.appendFile(toFakeFile, fakeDDL, function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        //console.log(toFile + " was saved!");
	    }
	}); 
});
