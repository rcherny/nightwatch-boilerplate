var util = require('util');
var events = require('events');

var debug = true;

function WaitForPageLoad() {
  events.EventEmitter.call(this);
  this.self = this;
  this.expectedValue = 'Page [Objects] loaded correctly';
  this.startTimer = null;
  this.cb = null;
  this.ms = null;
  this.documentState = '';
  this.abortOnFailure = false;
  this.rescheduleInterval = 300; //ms
}

util.inherits(WaitForPageLoad, events.EventEmitter);

WaitForPageLoad.prototype.command = function(milliseconds, cb) {
  var self = this;

  this.startTimer = new Date().getTime();
  this.cb =  function() {};

  // support for a custom message
  this.message = null;

  this.rescheduleInterval = 1000
  this.ms = milliseconds;
  this.checkPageLoaded();
  return this;
};


WaitForPageLoad.prototype.pageLoaded = function(result, now) {
  var defaultMsg = 'Page loaded after %t milliseconds.\n\tUrl: ' + result.value.url;
  return this.pass(result, defaultMsg, now - this.startTimer);
};


WaitForPageLoad.prototype.pageNotLoaded = function(result, now) {
  if (now - this.startTimer < this.ms) {

    // JS wasn't found, schedule another check
    this.client.api.log2console(' * Not loaded after ', now - this.startTimer, 'milliseconds');
    this.reschedule();
    return this;
  }

  var defaultMsg = 'Timed out while waiting for page to be loaded for %t milliseconds.\n\tUrl: ' + result.value.url;
  return this.fail(false, 'Page [Objects] NOT loaded correctly', this.expectedValue, defaultMsg);
};


/*!
 * Reschedule the checkPageLoaded
 */
WaitForPageLoad.prototype.reschedule = function(method) {
  var self = this;
  method = method || 'checkPageLoaded';

  setTimeout(function() {
    self[method]();
  }, this.rescheduleInterval);
};

WaitForPageLoad.prototype.complete = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  args.push(this);
  this.cb.apply(this.client.api, args);
  this.emit('complete');
  return this;
};

WaitForPageLoad.prototype.pass = function(result, defaultMsg, timeMs) {
  this.message = this.formatMessage(defaultMsg, timeMs);
  this.client.assertion(true, null, null, this.message, this.abortOnFailure);
  return this.complete(result);
};

WaitForPageLoad.prototype.fail = function(result, actual, expected, defaultMsg) {
  this.message = this.formatMessage(defaultMsg);
  this.client.assertion(false, actual, expected, this.message, this.abortOnFailure);
  return this.complete(result);
};

WaitForPageLoad.prototype.checkPageLoaded = function() {
  var self = this;

  this.self.api.execute( function() {

    return {
      ready : document.readyState,
      url : document.location.origin + document.location.pathname + document.location.search + document.location.hash
    }

  }, [], function(result) {

    var res = result.value,
        now = new Date().getTime(),
        passing = false;

    if (res.ready === 'complete' &&
      res.url !== "undefined") {
      passing = true;
    }

    if (passing === true)  {
      return self.pageLoaded(result, now);
    } else {
       return self.pageNotLoaded(result, now);
    }

  });

};


WaitForPageLoad.prototype.formatMessage = function (defaultMsg, timeMs) {

  var message = defaultMsg || this.message,
      time = timeMs || this.ms;

  return String(message).replace('%t', time);

};



module.exports = WaitForPageLoad;
