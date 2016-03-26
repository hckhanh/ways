var User = requireFromRoot("models/user");
exports.getUserAndRequire = function(req, res, next){
	if (typeof req.headers['sessionid'] == "undefined")  {
		outData({
	      code: responseCode.INVALID_PARAMS,
	      description :  "session does not exists",
	      response: null
	    },res);
	} else {
		User.findOne({sessionId: req.headers.sessionid})
		.then(function(user){	
			if (user == null){
				outData({
			      code: responseCode.EXPIRED,
			      description :  "Session does not exists",
			      response: null
			    },res);
			} else {
				req.user = user;
				next();								
			}
		}, function(err){
      outData({
        code : responseCode.FAIL,
        description : err,
        response: null
      }, res);
    });
	}
}

exports.getUserNotRequire = function(req, res, next){
	if (typeof req.headers['sessionid'] == "undefined")  {
		next();
	} else {
		User.findOne({sessionId: req.headers.sessionid})
		.then(function(user){	
			console.log(user)
			if (user == null){
				next();
			} else {
				req.user = user;
				next();
			}
		}, function(err){
      outData({
        code : responseCode.FAIL,
        description : err,
        response: null
      }, res);
    });
	}
}