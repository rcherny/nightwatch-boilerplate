/**
 *
 * Define tests used by all pages.
 * 	- test method utilities used for all tests.
 * 	- currently filled with incomplete stuff.
 *
 */
module.exports = function(client){

	var _ = require('underscore');

	var getGlobals = rootRequire('getGlobals.js');

	// var jsTests = rootRequire('jsTests.js');

	var checkHttpErrors = rootRequire('checkHttpErrors.js');
	var checkPageForErrors = rootRequire('checkPageForErrors.js');
	var doTimecheck = rootRequire('doTimecheck.js');

	// current client reference; we reset this below to re-use
	var thisClient = client;

	var testCollection = {

		// same code from globalPageTests.js
		// @todo fix this so it's not repeated
		preUrl : function(browser) {
			// we reset the client to the current session
			thisClient = browser;

			thisClient
				.timeouts("page load", 60000)
				.timeouts("script", 60000);

			return thisClient;
		},

		// not used at the moment
		loadUrl: function(urlKey) {
			var testUrl = getGlobals(thisClient, urlKey);

				thisClient.log2console(' * Testing with UserAgent:', thisClient.options.desiredCapabilities.browserName);
				thisClient.log2console(" * Loading Url: ", thisClient.launch_url + testUrl);
				thisClient.url(thisClient.launch_url + testUrl);

			return thisClient;
		},

		testPageLoaded : function() {


			thisClient.waitForGenericPageLoad(20000);

			checkHttpErrors(thisClient);
			// checkPageForErrors(thisClient);

			thisClient
				.log2console(' * ...Page loaded and HTTP and AceErrors (not) cleared');

			// jsTests.basicISOObjects(thisClient);

			return thisClient;
		},

		// testGenericHtml : function(){

		// 	thisClient
		// 		.testsTemplateHTML({ execute: "global" })
		// 		// .testsNav({ execute: [ "topNavHTML", "topNavFunction", "topNavResize" ] })

		// 	return thisClient;
		// },

		finalTests: function() {

			// jsTests.errors(thisClient);
			doTimecheck(thisClient, 5000);

			return thisClient;
		}

	};

	return testCollection;
};
