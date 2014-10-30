function permute(s, chosen){
    if (s.length == 0) {                                 
        console.log(chosen);                                                   
    } else {                                         
        for (var i = 0; i < s.length; i++) {                                               
            // choose                                              
            var chosenLetter = s.substring(i, i + 1);                                                   
            s = s.substring(0, i) + s.substring(i + 1, s.length);        // remove firstLetter from s                                        
            chosen += chosenLetter;                                         
                                            
            // explore                               
            permute(s, chosen);                                 
                                
            // un-choose                                                      
            chosen = chosen.substring(0, chosen.length - 1);                                         
            s = s.substring(0, i) + chosenLetter + s.substring(i);                                   
        }                                     
    }
}
//an alternative implementation that takes advantage of the fact that
// strings are immutable to make the "choosing" and "un-choosing" easier
function permute1(s, chosen) {
    if (s.length == 0) {
    	 console.log(chosen);    // base case
    } else {
        for (var i = 0; i < s.length; i++) {
            // choose
            var chosenLetter = s.substring(i, i+1);
            var newS = s.substring(0, i) + s.substring(i+1, s.length);        // remove firstLetter from s
            var newChosen = chosen + chosenLetter;
            
            // explore
            permute(newS, newChosen);
            
            // un-choose
            // nothing to do!
        }
    }
}

permute1("abcdefg", "");
module.exports = permute;