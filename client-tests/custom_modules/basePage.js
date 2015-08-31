/**
 * basePage	provides some simple methods for interacting with page objects
 * @type {object}
 */
var _ = require('underscore');

module.exports = (function(){

	var basePage = {

		// this is here if we wanted to bring in more tests to EVERY TEST
		// I'd call this a "SUPER" private api because baseAcePage will add tests too
		defaultTests : {}

	}

	return basePage.defaultTests;

})();
