  if (typeof window !== 'undefined' && window.navigator && window.document && !window.navigator.userAgent.match(/Node.js/)) {
    // Browser action
    getXhr = function () {
      // Would love to dump the ActiveX crap in here. Need IE 6 to die first.
      var xhr;
      var i;
      var progId;
      if (typeof XMLHttpRequest !== 'undefined') {
        return ((arguments[0] === true)) ? new XDomainRequest() : new XMLHttpRequest();
      }
      else {
        for (i = 0; i < 3; i++) {
          progId = progIds[i];
          try {
            xhr = new ActiveXObject(progId);
          }
          catch (e) {}

          if (xhr) {
            // Faster next time
            progIds = [progId];
            break;
          }
        }
      }

      if (!xhr) {
          throw new Error('getXhr(): XMLHttpRequest not available');
      }

      return xhr;
    };

    // Returns the version of Windows Internet Explorer or a -1
    // (indicating the use of another browser).
    // Note: this is only for development mode. Does not run in production.
    getIEVersion = function(){
      // Return value assumes failure.
      var rv = -1;
      if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
        if (re.exec(ua) != null) {
          rv = parseFloat( RegExp.$1 );
        }
      }
      return rv;
    };

    fetchText = function (url, callback) {
      var xdm = false;  
      // If url is a fully qualified URL, it might be a cross domain request. Check for that.
	  // IF url is a relative url, it cannot be cross domain.
      if (url.indexOf('http') != 0 ){
          xdm = false;
      }else{
          var uidx = (url.substr(0,5) === 'https') ? 8 : 7;
          var hidx = (window.location.href.substr(0,5) === 'https') ? 8 : 7;
          var dom = url.substr(uidx).split('/').shift();
          var msie = getIEVersion();
              xdm = ( dom != window.location.href.substr(hidx).split('/').shift() ) && (msie >= 7);
      }
      
      if ( xdm ) {
         var xdr = getXhr(true);
        xdr.open('GET', url);
        xdr.onload = function() {
          callback(xdr.responseText);
        };
        xdr.onprogress = function(){};
        xdr.ontimeout = function(){};
        xdr.onerror = function(){};
        setTimeout(function(){
          xdr.send();
        }, 0);
      }
      else {
        var xhr = getXhr();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function (evt) {
          //Do not explicitly handle errors, those should be
          //visible via console output in the browser.
          if (xhr.readyState === 4) {
            callback(xhr.responseText);
          }
        };
        xhr.send(null);
      }
    };

  }
  else if (
    typeof process !== 'undefined' &&
    process.versions &&
    !!process.versions.node
  ) {
    //Using special require.nodeRequire, something added by r.js.
    fs = require.nodeRequire('fs');
    fetchText = function ( path, callback ) {
      var body = fs.readFileSync(path, 'utf8') || '';
      // we need to remove BOM stuff from the file content
      body = body.replace(/^\uFEFF/, '');
      callback(body);
    };
  }
  else if (typeof java !== 'undefined' && typeof java.io !== 'undefined') {
    fetchText = function(path, callback) {
      var f = new java.io.File(path);
      var is = new java.io.FileReader(f);
      var reader = new java.io.BufferedReader(is);
      var line;
      var text = '';
      while ((line = reader.readLine()) !== null) {
        text += new String(line) + '\n';
      }
      reader.close();
      callback(text);
    };
  }