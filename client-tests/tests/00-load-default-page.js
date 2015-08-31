
/**
 * This is just a sample test file that does very little of anything.
 */

// points at the value to append to the launch_url from global.js
var urlKey = "urls.local.root";

var tests = {

	before: function(client, callback){

		client.page.All().preUrl(client);
		callback();
		
	},

	"Default Page Load Responds" : function(client){
		client
			.page.All().loadUrl(urlKey)
			.page.All().testPageLoaded();
	},

	after: function(client, callback){
		client
			.page.All().finalTests()
			.log2console('\n * Debug: all.after() ... closing browser.')
			.logDivider(2)
			.end();

		callback();
	}

};

module.exports = tests;
