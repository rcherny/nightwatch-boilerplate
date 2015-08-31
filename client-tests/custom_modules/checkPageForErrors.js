/**
 * Checks to make sure we didn't get an 404 page, 500 page, or page exception.
 */
module.exports = function(client) {

	// check for 404
	return client
		.log2console(' * Debug: checkMfcErrors()')
		.assert.elementNotPresent("#server404Error")
		.assert.elementNotPresent("#server500Error")
		.assert.elementNotPresent(".serverExceptionMessage")
		.log2console(' * ... Debug: END checkMfcErrors()')
};
