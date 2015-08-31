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
  this.abortOnFailure = true;
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
  
  // console.log('01 checkPageLoaded');

  this.self.api.execute( function() {

    var scriptTags = document.getElementsByTagName('script');
    var linkTags = document.getElementsByTagName('link');
    var isoAjax = iso && iso.page && iso.page.registry.ajax.ajaxCount;
    var req = require && require.s.contexts._.urlFetched;
    var reqque = require && require.s.contexts._.defQueue;

    return {
      iso : typeof window.iso,
      settings : (typeof window.iso !== 'undefined') ? typeof window.iso.settings : typeof window.iso,
      controller : (typeof window.iso !== 'undefined') ? typeof window.iso.controller : typeof window.iso,
      tools : (typeof window.iso !== 'undefined') ? typeof window.iso.tools : typeof window.iso,
      app : (typeof window.iso !== 'undefined') ? typeof window.iso.app : typeof window.iso,
      scriptTagLen : scriptTags.length,
      linkTagLen : linkTags.length,
      ready : document.readyState,
      ajax : isoAjax,
      registry : req,
      queue : reqque.length,
      url : document.location.origin + document.location.pathname + document.location.search + document.location.hash
    }

  }, [], function(result) {
    // console.log('02 callback')
    var res = result.value,
        now = new Date().getTime(),
        passing = false;

        // if (debug) {
        //   if (this.documentState !== res.ready) {
            console.log('\tDebug:', res.ready, '| css:', res.linkTagLen, '| scripts:', res.scriptTagLen, '| ajax:', res.ajax, '| queue:', res.queue);
            console.log('\tRequire Registry: ', res.registry);
            this.documentState = res.ready;
          // } else {
          //   console.log('\tChecking...', now);
        //   };
        // };

    if (res.ready === 'complete' &&
      res.iso !== "undefined" &&
      res.settings !== "undefined" &&
      res.controller !== "undefined" &&
      res.tools !== "undefined" &&
      res.app !== "undefined" &&
      res.linkTagLen > 0 &&
      res.scriptTagLen > 0 &&
      res.url !== "undefined")
    {
      passing = true;
    // } else {
    //   console.log(res);
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
