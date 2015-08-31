
module.exports = (function(){

	var _ = require('underscore');
	var globalPageTests = rootRequire('globalPageTests');
	var basePage = rootRequire('basePage.js');

	var baseTests = {
		before: function(client, callback) {
			client.log2console('\n * Debug: globalPage before()')
			// test saving this
			this._client = client;

			globalPageTests.preUrl(client);

			callback();
		// },
		// after: function(client, callback) {
		// 	client.log2console('\n * Debug: globalPage after() ... closing browser.');

		// 	// client.end();
		// 	callback();
		}
	};

	// just a convenience
	var globalPage = _.extend({}, basePage, baseTests);

	return globalPage;
})();
