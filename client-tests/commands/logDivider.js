/**
 * logDivider
 * @return {Command}     Nightwatch Command Scope / Context
 */

module.exports.command = function(){
	var self = this;
	var arg = arguments;

	var out1 = '-----------------------------------------------------------------------------------------------';
	var out2 = '==============================================================================================='
	var useThis;

	if (typeof arguments !== 'undefined') {
		if (arguments[0] === 1) {
			useThis = out1;
		} else {
			useThis = out2;
		};
	};

	self.perform(function(self, done){
		console.log.apply(console, [useThis])
		done();
	})
};
