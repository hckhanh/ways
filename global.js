global._ = require('underscore');
global._s = require('underscore.string');
global.when = require('when');
global.promiseAdapter = require('./libs/promise')
global.mongoose = require('mongoose')

global.responseCode = {
	SUCCESS : 			           1,
	FAIL :                        -1,
	INVALID_PARAMS :              -2,
	DATA_NOT_EXISTS :             -3,
	DATA_EXSISTS :                -4,
	PERMISSON	: 				  -5,
	EXCEPTION :                  -10,
	EXPIRED :                    -11,
	IS_USED :                    -12,
	UNAUTHORIZED :               401,
	FORBIDEN :	                 403,
	IS_BLOCK :                  1000,
	OBJECT_NOT_ACTIVE :         2000,
	OBJECT_ACTIVE :             3000
};

global.outData = function(data, res){
	data = {	
		code : data.code,
		description : data.description,
		response: data.response
	};
	res.json(data);
}

checkParams = function(req, res, params){
	req.body = _.extend(req.body, req.query, req.params);
	var promise = promiseAdapter.defer();
	var missingParams = [];
	_.each(params, function(param){
		if (typeof req.body[param] == "undefined") {
			promise.reject({
		      code: responseCode.INVALID_PARAMS,
		      description :  param + " not exists",
		      response: null
		    });
		}	
	})

	if (missingParams.length == 0) {
		promise.resolve(null);
	}
	return promise.promise;
}



global.makeid = function(length){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < length; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

global.requireFromRoot =  function(name) {
	if (name.charAt(0) != '/') {
    name = '/' + name;
  }
  return require(__dirname + name);
}

global.config = requireFromRoot('config/config.json');
global.constants = requireFromRoot('config/constants.json');

global.BaseModel = requireFromRoot('models/base')
global.extend = require('mongoose-schema-extend')
