var round = Math.round;

Math.round = function (value, digits) {
    if (digits) {
        var pow = Math.pow(10, digits);
        return round(value * pow) / pow;
    }
    return round(value);
};


toCamelCase = function(prop){
    var re = /(\-([a-z]){1})/g;
    if (prop == 'float') {
        prop = 'styleFloat';
    }

    if (re.test(prop)) {
        prop = prop.replace(re, function () {
            return arguments[2].toUpperCase();
        });
    }
    return prop;
};

console.log(toCamelCase('xy-hh-dd-ee'));

console.log(Math.round(2.4556, 3));