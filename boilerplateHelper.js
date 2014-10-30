//BoilerplateMVC Helper Methods
boilerplateMVC = {
    loadCSS: function(url, callback) {
        var link = d.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        d.getElementsByTagName("head")[0].appendChild(link);
        if(callback) {
            callback();
        }
    },
    loadJS: function(file, callback) {
        var script = d.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {  // IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Other Browsers
            script.onload = function() {
                callback();
            };
        }
        if(((typeof file).toLowerCase()) === "object" && file["data-main"] !== undefined) {
            script.setAttribute("data-main", file["data-main"]);
            script.async = true;
            script.src = file.src;
        } else {
            script.src = file;
        }
        d.getElementsByTagName("head")[0].appendChild(script);
    },
    loadFiles: function(production, obj, callback) {
        var self = this;
        if(production) {
            // Loads the production CSS file(s)
            self.loadCSS(obj["prod-css"], function() {
                // If there are production JavaScript files to load
                if(obj["prod-js"]) {
                    // Loads the correct initialization file (which includes Almond.js)
                    self.loadJS(obj["prod-js"], callback);
                }
            });
        } else {
            // Loads the development CSS file(s)
            self.loadCSS(obj["dev-css"], function() {
                // If there are development Javascript files to load
                if(obj["dev-js"]) {
                    // Loads Require.js and tells Require.js to find the correct intialization file
                    self.loadJS(obj["dev-js"], callback);
                }
            });
        }
    }
};