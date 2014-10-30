var s = "REGEXP_LIKE (c.code, ''^[0-9]*$'')";
var template = '%VIEW_DDL%';


console.log(fakeReplace(template, '%VIEW_DDL%', s));

s = s.replace(/\$/g,"$$$$");
//console.log(s);
//console.log(template);

console.log("--replaced--\n\n");

var ddl = template.replace('%VIEW_DDL%', s);
console.log(ddl);


function fakeReplace(str, substr, newstr) {
    return str.split(substr).join(newstr);
}

console.log("--fake replaced--\n\n");

