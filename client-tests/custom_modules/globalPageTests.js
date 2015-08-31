var _ = require('underscore');

module.exports = (function(){

	var checkHttpErrors = rootRequire('checkHttpErrors.js');
	var checkAceErrors = rootRequire('checkAceErrors.js');
	// var jsTests = rootRequire('jsTests.js');

	var tests = {
		preUrl : function(client) {
			client.log2console('\tDebug: preUrl()');

			client.timeouts("page load", 60000)
				.timeouts("script", 60000);

			return client;
		},
		initial : function(client) {

			checkHttpErrors(client);

			client.waitForPageLoad(60000);

			checkAceErrors(client);

			client
				.log2console('\t00 Debug: ****************** in the middle of the initial tests!!');

			jsTests.basicISOObjects(client);

			client.log2console('\t00 Debug: .............. done with basic JS tests');

			client
				.testsTemplateHTML({ execute: "global" })
				// .testsNav({ execute: [ "topNavHTML", "topNavFunction", "topNavResize" ] })
				.testsDrawer({ execute: "basicHTML" })

			return client;
		},
		finalTests: function(client) {

			client.log2console('\tDebug: 00 Calling jsTests final()');

			jsTests.errors(client);

			client.log2console('\tDebug: 00 DONE Calling jsTests final()');

			return client;
		}
	}
	return tests;

})()
