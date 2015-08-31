var fs = require('fs');
var mkdirp = require("mkdirp");
var rimraf = require("rimraf");
var async = require("async");


/**
 * Remove and create the folders required for test output.
 * Nothing is returned, it just sychronously does it's thing
 * @requires fileUtils and mkdirp
 * @return {void} 
 */
function cleanUp(cbFinishedCleanup){
  
	var foldersToMake = ["target/reports", "target/screenshots", "target/integration", "target/log"];

 	rimraf("target", function(err){

 		if (err) {
 			console.log(err)
 			return;
 		} else {

	 		async.each(foldersToMake, function(folder, callback) {

	 			mkdirp(folder, function(err) {
	 				if (err) {
	 					console.log(err)
	 				} else {
	 					callback();
	 				}
	 			});

	 		}, function() {

	 			if (typeof cbFinishedCleanup === "function") {
	 				cbFinishedCleanup();
	 			}
	 		});
	 	}
  	});
  
  

}

function getDirectories(testsDirectory) {
  return fs.readdirSync(testsDirectory).filter(function (file) {
    return fs.statSync(testsDirectory + "/" + file).isDirectory();
  });
}

module.exports = {
  cleanUp : cleanUp,
  getDirectories : getDirectories
} 