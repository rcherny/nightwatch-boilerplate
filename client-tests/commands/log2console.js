/**
 * log2console
 * @return {Command}     Nightwatch Command Scope / Context
 */

var getGlobals = rootRequire('getGlobals.js');

module.exports.command = function(){

	var globalDebug = getGlobals(this, 'debug');
	var self = this;
	var args = arguments;

	if (globalDebug === true) {
		self.perform(function(self, done){
			console.log.apply(console, args)
			done();
		})
		return self;
	} else {
		self.perform(function(self, done){
			done();
		})
		return self;
	};

};
