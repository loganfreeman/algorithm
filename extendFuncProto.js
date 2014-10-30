function extendFunctionPrototype(key, fnc) {
    var originalFunction = Function.prototype[key];

    if (originalFunction) {
        Function.prototype[key] = function () {
            originalFunction.apply(this, arguments);
            fnc.apply(this, arguments);
            return this;
        };
    } else {
        Function.prototype[key] = fnc
    }
}