function randomString(bits){
    var chars,rand,i,ret
      chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
      ret=''
      // in v8, Math.random() yields 32 pseudo-random bits (in spidermonkey it gives 53)
      while(bits > 0){
        rand=Math.floor(Math.random()*0x100000000) // 32-bit integer
        // base 64 means 6 bits per character, so we use the top 30 bits from rand to give 30/6=5 characters.
        for(i=26; i>0 && bits>0; i-=6, bits-=6) ret+=chars[0x3F & rand >>> i]}
      return ret
}
console.log(0x3F);
console.log(randomString(30))

var test = function(){
	
	/*
	 hello world
	 */
};

var s = new String(test);
console.log(s.substring(s.indexOf("/*") + 3, s.lastIndexOf("*/")));


Function.prototype.getstr = function() {  
    var lines = new String(this);  
    lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));  
    return lines;  
};

String.prototype.$ = function(r, v){ return this.replace(new RegExp('<!-- ' + r + ' -->', 'g'), v);};
String.prototype.trim = function() { return this.replace(/^\s+/g,"").replace(/\s+$/g,""); };