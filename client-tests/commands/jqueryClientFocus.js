
/**
 * This could be followed by jqueryClientClick() or 
 *
	client
	  .keys(client.Keys.CONTROL) // hold the control
	  .click('#element')
	  .keys(client.Keys.NULL) // release the control
 */

module.exports.command = function(selector){
	this.execute(
		function(selector){
			if (typeof $ !== 'undefined') {
				$(selector).focus();
				return true;
			} else {
				return false;
			};
		},
		[selector],
		function(results){
			this.assert.equal(results.value, true, "Focused on element " + selector);
		}
	);
	return this;
}