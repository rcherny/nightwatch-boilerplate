module.exports = (function(){

	var global = {

		// debug = true sets extra console output when using client.log2console
		debug: true,

		// these values are set in the nightwatch.conf.js file
		// **** no trailing slashes!! ****
		targetServers: {
			// only for testing basic connectivity
			testConnect: {
				root: 'http://google.com'
			},
			// local development server
			local: {
				root: 'http://localhost:8000'
			},
			// misc static server
			nodejs: {
				root: 'http://localhost:9000'
			},
			dev: {
				root: 'http://dev.example.com'
			},
			test: {
				root: 'http://test.example.com'
			}
		},

		// putting this separate from the targetServers config allows more flexibility
		urls: {
			local: {
				root: '/',
				login: '/login'
			}
		},

		after: function(cb){
			console.log('');
			console.log('***********************************************************************************************');
			console.log('******************* Global "after()" Callback. Nightwatch tests complete. *********************');
			console.log('***********************************************************************************************');
			console.log('');
			cb();
		}
	}
	return global;
}());
