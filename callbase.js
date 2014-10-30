var callBase = function () {
    // get arguments
    var args = Array.prototype.slice.call(arguments);

    if (args.length === 0) {
        // use arguments from call
        args = Array.prototype.slice.call(arguments.callee.caller.arguments);
    }

    return arguments.callee.caller.baseImplementation.apply(this, args);
};


module.exports = callBase;