
module.exports.command = function(selector){
	this.execute(
		function(selector){
			if (typeof $ !== 'undefined') {

				// set a flag
				var triggerClick = false;
				// find the thing
				var $thing = $(selector);

				// bind a focus handler
				$thing.on('focus.nw', function(){
					// set the flag
					triggerClick = true;
					// trigger the click
					$(this).trigger('click');
					return true;
				// }).on('blur', function(){
				// 	// on blur trigger focus if we are still false
				// 	if (!triggerClick) {
				// 		return false;
				// 		// $(this).trigger('focus.nw');
				// 	} else { // if true then just return
				// 		return true;
				// 	};
				});

				$thing.trigger('focus.nw')

				return true;
			} else {
				return false;
			};
		},
		[selector],
		function(results){
			this.pause(1000);
			// console.log(results);
			this.assert.equal(results.value, true, "Focused and Clicked on element " + selector);
		}
	)

	return this;
};
