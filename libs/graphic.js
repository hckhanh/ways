var imagick = require("imagemagick");
var gma = require("gm");
var gm = gma.subClass({ imageMagick: true });

exports.cropImage = function(name){
	var promise = promiseAdapter.defer();
	imagick.identify(name, function(err, features){
    if (err) {
    	promise.reject(err);
    } else {
    	if (features.width > features.height) {
				imagick.crop({
			  	srcPath: name,
			  	dstPath: name,
			  	width: features.height,
			 		height: features.height,
			  	quality: 1,
			  	gravity: "Center"
				}, function(err, stdout, stderr){
				  		promise.resolve(null);
				});
    	} else {
    		imagick.crop({
			  	srcPath: name,
			  	dstPath: name,
			  	width: features.width,
			 		height: features.width,
			  	quality: 1,
			  	gravity: "Center"
				}, function(err, stdout, stderr){
				  		promise.resolve(null);
				});
    	}
    }
	});

	return promise.promise;
}

exports.resize = function(params){
	var promise = promiseAdapter.defer();
	gm(params.name)
	.autoOrient()
	.resize(params.width, params.height)
	.write( params.output_name, function(err){
		if (err) {
			promise.reject(err);
		} else {
			promise.resolve(params.output_name);
		}
	});
	return promise.promise;
}


exports.roundImage = function (params){
	var promise = promiseAdapter.defer();
	imagick.convert([
    params.name,
    "-matte",
    "mask.png",
    "-compose",
    "DstIn",
    "-composite",
    params.output_name
    ], 
    function(err) {
    	if (err) {
				promise.reject(err);
			} else {
				promise.resolve(params.output_name);
			}
	});

	return promise.promise;
}

exports.composite_image = function(params){
	var promise = promiseAdapter.defer();
	imagick.convert([
  	params.marker,
  	params.name,
  	'-geometry',
  	params.position,
  	'-composite',
  	params.output_name
  	], 
	function(err, metadata){
  	if (err){
  		promise.reject(err)
  	} else {
  		promise.resolve(params.output_name)
  	}
	});
	return promise.promise;
}