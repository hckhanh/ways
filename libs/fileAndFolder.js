var fs = require("fs");
exports.writeFile = function(params){
	var promise = promiseAdapter.defer();
	fs.writeFile(params.name, params.binaryData, "binary", function (err) {
	    if (err) {
			promise.reject(err);
	    } else {
	    	promise.resolve(null)
	    }
	});

	return promise.promise;
}