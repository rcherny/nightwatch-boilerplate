
/*

THIS IS POSSIBLE ALTERNATIVE, POSSIBLY BETTER?

client
  .keys(client.Keys.CONTROL) // hold the control
  .click('#element')
  .keys(client.Keys.NULL) // release the control

 */

module.exports.command = function(selector){
	this.execute(
		function(selector){
			if (typeof $ !== 'undefined') {
				$(selector).click();
			} else {
				return false;
			};
			return true;
		},
		[selector],
		function(results){
			this.assert.equal(results.value, true, "Clicked on element " + selector);
		}
	);
	return this;
}