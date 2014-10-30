var fs    = require('fs');
var pattern = /^\d{1,3}-(.*)$/;

function rename(directory, old){
	var oldPath = directory + '\\' + old;
	var match = old.match(pattern);
	if(match && match.length){
		var newPath = directory + "\\" + match[1];
		console.log(newPath);
		fs.rename(oldPath, newPath, function(err){if(err)console.log(err)});
	}

}


function getFiles(dir){
    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'\\'+files[i];
        if (fs.statSync(name).isDirectory()){
            //getFiles(name);
        }else{
            //console.log(name)
        	rename(dir, files[i]);
        }
    }
}

getFiles("C:\\Users\\scheng\\Music\\J. K. Rowling");

