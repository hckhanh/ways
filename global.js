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
	PERMISSON	: 				-5,
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


global.checkHeader = function(req, res, next){
	if( typeof req.headers['authorization'] == 'undefined' ||
		typeof req.headers['buildnumber'] == 'undefined' ||
		typeof req.headers['os'] == 'undefined' ||
		typeof req.headers['deviceid'] == 'undefined'
	) 
		outData({
	      code: responseCode.UNAUTHORIZED,
	      description :  "Missing header param(s)",
	      response: null
	    }, res);
	else {
		var header=req.headers['authorization']||'',        // get the header
	        token=header.split(/\s+/).pop()||'',            // and the encoded auth token
	        auth=new Buffer(token, 'base64').toString(),    // convert from base64
	       	parts=auth.split(/:/),                          // split on colon
	        username=parts[0],
	        password=parts[1];

	    if (username != "sivy_api" || password != "imsuperman") {
	    	outData({
		      code: responseCode.UNAUTHORIZED,
		      description :  "Unauthorize",
		      response: null
		    }, res);
	    } else {
	    	next();
	    }
	}
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

global.requestData = function(url, method, body, header, type) {
	var URL = require('url');
	if (type && type == "https") {
		var http = require('https');	
	} else {
		var http = require('http');
	}
	
  var deferred = promiseAdapter.defer();
  
  var options = URL.parse(url);
  options.method = method || "GET";
  options.headers = header

  var req = http.request(options, function(res) {
    res.setEncoding('utf8');

    var data = '';

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      try {
        deferred.resolve(JSON.parse(data));
      } catch (e) {
        deferred.reject(e);
      }
    });
  });

  req.on('error', function(err) {
    console.log('call api error');
    console.log(err);
    deferred.reject(err);
  });

  if (method == 'POST')
    req.write(JSON.stringify(body));

  req.end();

  return deferred.promise;
}

global.downloadWebsite = function(url, type) {
	var URL = require('url');
	if (type && type == "https") {
		var http = require('https');	
	} else {
		var http = require('http');
	}
	
  var deferred = promiseAdapter.defer();
  
  var options = URL.parse(url);
  options.method =  "GET";
  
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');

    var data = '';

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      try {
        deferred.resolve(data);
      } catch (e) {
        deferred.reject(e);
      }
    });
  });

  req.on('error', function(err) {
    deferred.reject(err);
  });

  req.end();

  return deferred.promise;
}