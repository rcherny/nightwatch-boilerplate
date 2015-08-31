
module.exports = function(client, threshold) {

	/**
	 * @todo the percentage calculations don't see correct here
	 */
	client.execute(function(){
		if(window && window.performance && window.performance.timing){
			return window.performance.timing;
		}
	}, [], function(res){
		if (res.value){
			var val = res.value;
			var total = 0;
			var current;
			var percent;
			if (val.navigationStart > 0 && val.loadEventEnd > 0){
				total = (val.loadEventEnd - val.navigationStart) / 1000;
				console.log('\nTotal Load Time: ' + total + 's');
			}
			if (val.navigationStart > 0 && val.connectEnd > 0){
				current = (val.connectEnd - val.navigationStart) / 1000;
				if (total > 0){
					percent = Math.round(((current / total) * 100) * 100) / 100;
					console.log(' - Network time: ' + percent + '%: ' + current + 's');
				} else{
					console.log(' - Network time: ' + current + 's');
				}
			}
			if (val.requestStart > 0 && val.responseEnd > 0){
				current = (val.responseEnd - val.requestStart)/1000;
				if (total > 0){
					percent = Math.round(((current / total) * 100) * 100) / 100;
					console.log(' - Server time: ' + percent + '%: ' + current + 's');
				} else{
					console.log(' - Server time: ' + current + 's');
				}
			}
			if (val.domLoading > 0 && val.loadEventEnd > 0){
				current = (val.loadEventEnd - val.domLoading)/1000;
				if (total > 0){
					percent = Math.round(((current / total) * 100) * 100) / 100;
					console.log(' - Browser time: ' + percent + '%: ' + current + 's');
				} else{
					console.log(' - Browser time: ' + current + 's');
				}
			}
		}
	});

	return client;
};
