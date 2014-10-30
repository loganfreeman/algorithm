function clone(obj) {

    if (obj instanceof Array) {
        return obj.slice();
    }

    var ret = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var value = obj[key];
            ret[key] = value instanceof Object ? clone(value) : value;
        }
    }

    return ret;

}