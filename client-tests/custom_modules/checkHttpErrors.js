/**
 * Checks to make sure we didn't get back a generic 407 or 500 response.
 */
module.exports = function(client) {

	return client
		.log2console(' * Debug: checkHttpErrors()')

		// check for 404
		.getTitle(function(title) {
			client.assert.ok(title.match(/Not Found/) === null, "Response is NOT generic 'Error 404 Not Found'");
		})

		// check for 403
		.getTitle(function(title) {
			client.assert.ok(title.match(/Access Denied/) === null, "Response is NOT generic 'Access Denied' (403)")
		})

		// check for 407
		.getTitle(function(title) {
			client.assert.ok(title.match(/^407 /) === null, "Response is NOT generic 'Error 407 Proxy Authentication Required'");
		})

		// check for 500
		.getTitle(function(title) {
			client.assert.ok(title.match(/^500 /) === null, "Response is NOT generic 'Error 500 Internal Server Error'");
		})

		// unspecified error
		.getTitle(function(title) {
			client.assert.ok(title.match(/^Error/) === null, "Response is NOT generic 'Error'");
		})

		.log2console(' * ...done checkHttpErrors()');

};
