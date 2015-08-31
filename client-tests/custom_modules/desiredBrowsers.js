/**
 * This function returns a desiredCapabilities object based on a selected string
 *   which keys to a defined profile for a browser
 * Ths is step 1 to decouple our browsers from our test environments.
 * @function desiredBrowsers
 * @param  {string} key string description of the browser we want.
 * @return {object} desiredCapabilities object
 */
function desiredBrowsers(key){
  var browserStr = '';
  // set a default browser
  if (typeof key === 'undefined') {
    browserStr = 'phantomjs';
  } else {
    browserStr = key;
  };

  var browsers = {
    "phantomjs" : {
        "browserName": "phantomjs",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "phantomjs.cli.args" : ["--ignore-ssl-errors=true"],
        "phantomjs.binary.path": require("phantomjs").path
    },
    "phantomjs2" : {
        "browserName": "phantomjs",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "phantomjs.cli.args" : ["--ignore-ssl-errors=true"],
        "phantomjs.binary.path": require("phantomjs2").path
    },
    "chrome" : { 
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "chromeOptions": {
          "args": ["--incognito", "--disable-extensions", "window-size=1000,900"]
        }
    },
    // have not added MSIE support to ISO testing yet
    // "msie" : { 
    //     "browserName": "msie",
    //     "javascriptEnabled": true,
    //     "acceptSslCerts": true
    // },
    "firefox" : {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true
    }
  }
  try {
    return browsers[key];
  } catch(e) {
    throw new Error(e);
  }
}

module.exports = desiredBrowsers;
