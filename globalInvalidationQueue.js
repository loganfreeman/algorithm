// global invalidation timer
var globalInvalidationQueue = (function () {

    var id,
        callbacks = [],
        work = function () {
            for (var i = 0; i < callbacks.length; i++) {
                try {
                    callbacks[i]();
                } catch (e) {
                    (console.warn || console.log).call(console, e);
                }
            }

            callbacks = [];
            id = null;
        };

    return {
        addCallback: function (callback) {
            callbacks.push(callback);

            if (!id) {
                id = setTimeout(work, 1000 / 60);
            }
        }
    };
})();

module.exports = globalInvalidationQueue;