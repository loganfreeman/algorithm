var s = "REGEXP_LIKE (c.code, ''^[0-9]*$'')";

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

console.log(template);

console.log("--replaced--\n\n");

var ddl = template.replace('%VIEW_DDL%', s);
console.log(ddl);


function fakeReplace(str, substr, newstr) {
    return str.split(substr).join(newstr);
}

console.log("--fake replaced--\n\n");

console.log(fakeReplace(template, '%VIEW_DDL%', s));