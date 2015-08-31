/**
 * Usage
   	var Environment = require('Environment');
    	Environment.config(
    	{
    		"name": "default",
            "launch_url": "localhost:8080",
            "selenium_port": process.env.WEB_DRIVER_PORT,
            "selenium_host": "localhost",
            "silent": true,
            "firefox_profile": false,
            "chrome_driver": "",
            "ie_driver": "",
            "desiredCapabilities" : browserSelect('firefox'),
            "screenshots": {
                "enabled": true,
                "path": "target/screenshots"
            },
            "output": true,
            "exclude": ["post-pages-user", "post-pages-login", "breakpoints", "search"]
	  	})
 
  	var fit1 = new Environment("fit1", {
        "launch_url": "https://fit1.mackenzieinvestments.com:2703"
  	}, 'chrome');
	
	var fit1Firefox = Environment.extends(fit1);
		fit1Firefox.setBrowser('firefox'); // exactly the same except the browser

	var fit2 = Environment.extends(fit1, {
		"launch_url": "https://fit2.mackenzieinvestments.com:2707"
	}) // same as fit1 but different launch url

   	module.exports = Environment.return();
 * 
 * 
 */

var _ = require('underscore');
var browserSelect = rootRequire('isoBrowsersConfig');

module.exports = (function(config){	

	var collection = [];
	var defaultEnv = {};
	var init = false;
	var defaultBrowser = 'firefox';
	var parallelSet = {
		"include" : {
			"a": ["pagesA"],
			"b": ["pagesB"],
			"c": ["templates", "widgets", "integration"],
			"d": ["pricesperformance"],
			"e": ["fundtypes"]
		}
	};

	/**
	 * @constructor
	 * @param  {Object} options object hash of options that deviate from the defaultEnv
	 * @param  {String} browser string matching a key in isoBro
	 * @return {Environment}         Object with keys and methods etc.
	 */
	var environment = function(nameOf, options, browser){
		if (typeof options === 'undefined') {
			options = {};
		};
		this.settings = _.extend(defaultEnv, {"name" : nameOf}, options);
		if (typeof browser === 'undefined') {
			this.setBrowser(defaultBrowser);
		};
		collection.push(this);
	}

	/**
	 * @static
	 * Configure the defaultEnv set up for the objects
	 * @param  {object} obj object showing the default items, this is pushed into "defaultEnv"
	 * @return {void} 
	 */
	environment.config = function(obj){
		if (!init) {
			// add our custom properties to the defaults
			defaultEnv = _.extend(obj, parallelSet);
			init = true;
		};
	}

	/**
	 * @static
	 * Get the private collection
	 * @return {Array} collection of Environments
	 */
	environment.getAll = function(){
		return collection;
	}

	/**
	 * @static
	 * Take an existing environment and augment it with new or different settings
	 * @param  {Environment} env        Existing environment object
	 * @param  {Object} newOptions Object with set of settings
	 * @return {Environment}            New environment object based on the old
	 */
	environment.extends = function(env, newOptions){
		var newEnv = _.clone(env);
		if (typeof newOptions !== 'undefined') {
			newEnv = _.extend(newEnv, newOptions);
		};
		return newEnv;
	}

	/**
	 * @static
	 * Combine all items in a collection into a big object
	 * 	Must fire prior to being exported in nightwatch.conf.js
	 * @return {object}
	 */
	environment.return = function(){
		// add our custom properties to the defaults
		var env = defaultEnv;
			env["test_settings"] = {};
		var collection = environment.getAll();
			collection = _.indexBy(collection, 'name');
			env["test_settings"] = collection;
		return env;
	}

	/**
	 * Instance Prototype Methods and Properties
	 */
	environment.prototype.setBrowser = function(browser){
		var brow = browserSelect(browser);
		this.settings["desiredCapabilities"] = brow;
	}

	return environment;
})();
