var fs = require('fs'), readline = require('readline');
var path = 'data/view1.sql';
var line = String(fs.readFileSync(path));

line = line.replace(/\n\s*\n/g, '\n');

var template = "SET DEFINE OFF\n" +
"SET serveroutput ON\n\
DECLARE\n\
BEGIN\n\
Execute immediate '%VIEW_DDL%';\n\
EXCEPTION\n\
WHEN OTHERS THEN\n\
DBMS_OUTPUT.PUT_LINE (SQLCODE || ' ' || SQLERRM);\n\
ROLLBACK;\n\
END;\n\
/\n\n";

var regex = new RegExp('MASTER_B', "g");

line = line.replace(regex, "SCHENG");
line = line.replace(new RegExp("'", "g"), "''");

console.log(line);

var ddl = template.replace('%VIEW_DDL%', line);
console.log(ddl);