// /**
//  * PRECONDITIONS:
//  * Assumes jQuery has been loaded and defined on the page, so we can use normal CSS selectors to find the appropriate elements.
//  *
//  *
//  * USAGE:
//  *
//  * When an Ajax request will result in an element appearing on the page:
//  *  - browser.waitForAjaxComplete(".myWatchList", true, 20000)
//  *
//  * When an Ajax request will result in an element becoming visible on the page:
//  *  - browser.waitForAjaxComplete(".addedToWatchList.watchListTooltip:visible", true, 10000)
//  *
//  * When an Ajax request will result in an element being removed from the page:
//  *  - browser.waitForAjaxComplete(".myWatchlist table .fundName a[href*='" + fundAId + "']", false, 10000)
//  */

// var util = require('util');
// var events = require('events');
// var debug = true;

// /**
//  * Defines an object that will contain the logic and supporting methods.
//  * @returns void
//  */
// function waitForAjaxComplete() {

// 	// set up the event emitter
// 	events.EventEmitter.call(this);

// 	this.self = this;

// 	// set some initial values
// 	this.abortOnFailure = false;
// 	this.interval = null;
// 	this.intervalDuration = 5000;
// 	this.count = 0;
// 	this.ajaxCount = null;
// 	this.startTime = (new Date()).getTime();
// }

// // makes the test continue until we fire the "complete" event to enable use of setInterval
// util.inherits(waitForAjaxComplete, events.EventEmitter);

// /**
//  * Main command function; this is the entry point.
//  * Checks for the presence of an element matching the given selector OR the standard error dialog until one is found or timeout occurs.
//  * @param {string} elementSelector A CSS selector of an element that should be present and visible once the Ajax request returns.
//  * @param {boolean} elementShouldAppear True if we should wait for the element to be present, false if we should wait for the element to go away.
//  * @param {int} timeout How long, in milliseconds, to keep waiting for the element or error dialog.
//  * @returns {object} The Nightwatch browser object.
//  */
// waitForAjaxComplete.prototype.command = function(elementSelector, elementShouldAppear, timeout) {
// 	var self = this;

// 	// save the params and do some initial setup
// 	this.elementSelector = elementSelector;
// 	this.elementShouldAppear = elementShouldAppear;
// 	this.timeout = timeout;

// 	// perform the initial check
// 	this.check();

// 	// set up future checks
// 	this.interval = setInterval(function() {
// 		self.count++;
// 		// console.log('......000')
// 		// console.log('running interval ', self.count)
// 		self["check"]();
// 	}, this.intervalDuration);

// 	return this;
// }

// /**
//  * Determines if the element or an error dialog are present on the page.
//  * @returns void
//  */
// waitForAjaxComplete.prototype.check = function() {
// 	var self = this;

// 	// console.log('running check() self.count: ', self.count);

// 	// run some javascript on the client
// 	this.self.api.execute(

// 		function(elementSelector) {

// 		    var isoAjax = iso && iso.page && iso.page.registry.ajax.ajaxCount;

// 			// if jquery is defined
// 			if (typeof $ != "undefined") {
// 				var el = $(elementSelector);

// 				var errorDialog = $("#ajaxerror");
// 				var errorFound = (errorDialog.length > 0);
// 				var errorDetails = "";


// 				// if the error dialog is present on the page
// 				if (errorFound) {

// 					// get the title of the error dialog
// 					var errorTitleEl = errorDialog.find(".modal-header #myModalLabel");
// 					if (errorTitleEl.length > 0) errorDetails += errorTitleEl.text().trim() + " ";

// 					// get the error details
// 					var errorDetailsEl = errorDialog.find(".modal-body");
// 					if (errorDetails.length > 0) errorDetails += errorDetailsEl.text().trim();
// 				}

// 				return {
// 					elementPresent: (el.length > 0),
// 					errorFound: errorFound,
// 					errorDetails: errorDetails
// 					, isoajax: isoAjax
// 				};
// 			}
// 			// if jquery is not defined
// 			else {
// 				return {
// 					elementPresent: false,
// 					errorFound: true,
// 					errorDetails: "[waitForAjaxComplete: jQuery not defined, unable to search for elements by selector]"
// 					, isoajax: 0
// 				}
// 			}

// 		},

// 		[this.elementSelector],

// 		// evaluate the result
// 		function(result) {
// 			// console.log('......001')
// 			self.evaluate(result.value.elementPresent, result.value.errorFound, result.value.errorDetails, result.value.isoajax);
// 		}
// 	);
// }

// /**
//  * Evaluates the results from the page and fires the appropriate assertion if an end case is reached.
//  * @param {boolean} elementPresent True if the element was found on the page, false otherwise.
//  * @param {boolean} errorFound True if an error dialog was found on the page, false otherwise.
//  * @param {string} errorDetails Contains error details if an error was found, empty string otherwise.
//  * @returns void
//  */
// waitForAjaxComplete.prototype.evaluate = function(elementPresent, errorFound, errorDetails, isoajax) {
// 	// console.log('....evaluate response');
// 	var now = (new Date()).getTime();
// 	var timeSoFar = now - this.startTime;
// 	var timeoutExceeded = (timeSoFar > this.timeout);
// 	var ajaxDone = false;
// 	var self = this;

// 	// determine if the change we've been waiting for occurred
// 	var elementChangeOccurred = (elementPresent && this.elementShouldAppear) || (!elementPresent && !this.elementShouldAppear);

// 	if (debug) {
// 		// console.log('\n');
// 		console.log('\tDebug: Selector: ', this.elementSelector, 'Ajax Running: ', isoajax);
// 	};

// 	if (isoajax < self.ajaxCount) {
// 		// console.log('new ajax running amount less than self.ajaxCount')
// 		ajaxDone = true;
// 	} else if (self.ajaxCount !== isoajax) {
// 		self.ajaxCount = isoajax // set our counter to the existing value
// 	};
// 	// console.log('\n')

// 	// if we've reached an end case, stop the interval and get out
// 	if ((elementChangeOccurred) || (errorFound) || (timeoutExceeded) || ajaxDone) {

// 		// console.log('......002')

// 		clearInterval(this.interval);
// 		this.emit('complete');

// 		// if there was an ajax error, fire a failing assertion with the error details
// 		if (errorFound) {
// 			this.client.assertion(false, errorDetails, "", "Ajax response contained an error", this.abortOnFailure);
// 		}
// 		// if the element was found without error, fire a passing assertion
// 		else if (elementChangeOccurred) {
// 			this.client.assertion(true, null, null, "Ajax request finished successfully; '" + this.elementSelector + "' " + ((this.elementShouldAppear) ? "was found after" : "was removed after") + " " + timeSoFar + " ms", this.abortOnFailure);
// 		}
// 		// if we've exceeded the timeout, fire a failing assertion saying so
// 		else if (timeoutExceeded) {
// 			this.client.assertion(false, "not found", "'" + this.elementSelector + "' or error to be found", "Ajax request did not finish within " + this.timeout + " milliseconds", this.abortOnFailure);
// 		}
// 	}

// }

// module.exports = waitForAjaxComplete;
