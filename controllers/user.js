var User = requireFromRoot('models/user')
var fileLib = requireFromRoot("libs/fileAndFolder");

exports.login = function(req, res){
	var params = _.pick(req.body, "username", "email", "password", "location");

	User.login(params)
	.then(function(user){
		outData(user, res);
	}, function(err){
		outData(err, res);
	})
}

exports.register = function(req,res){
	var params = _.pick(req.body, "username", "email", "password");
	User.register(params)
	.then(function(user){
		outData(user, res);
	}, function(err){
		outData(err, res);
	})
}

function saveAvatar(base64Data){
	var promise = promiseAdapter.defer();
	base64Data  =   base64Data.replace(/^data:image\/png;base64,/, "");
	base64Data  =   base64Data.replace(/^data:image\/jpeg;base64,/, "");

	base64Data  +=  base64Data.replace('+', ' ');
	var binaryData  =   new Buffer(base64Data, 'base64').toString('binary');
	var name = (new Date()).getTime() + makeid(10)+".png";
	var path_name = 'public/images/avatar/' + name;
	fileLib.writeFile({
		name: path_name,
		binaryData: binaryData
	})
	.then(function(){
		promise.resolve(name);
	})

	return promise.promise;
}


exports.edit = function(req,res){
	var params = _.pick(req.body, "username", "avatar", "password");
	req.user.username = params.username;

	if (params.password) {
		var crypto = require('crypto');
		var md5 = crypto.createHash('md5');
    md5.update(params.password);
    var hexPass = md5.digest("hex");
	}
	var promise;
	if (params.avatar) {
		promise = saveAvatar(params.avatar)
		.then(function(avatar){
			req.user.avatar = avatar;
			return req.user;
		});
	} else {
		promise = promiseAdapter.defer();
		promise.resolve(null);
		promise = promise.promise;
	}

	promise.then(function(){
		req.user.save()
		.then(function(user){
			outData({
	      code: responseCode.SUCCESS,
	      description : "Success",
	      response: user
	    }, res)
		})
	})
}

exports.logout = function(req,res){
	req.user.sessionId = "";
	req.user.sessionTime = 0;
	req.user.save()
	.then(function(user){
		outData({
      code: responseCode.SUCCESS,
      description : "Success",
      response: null
    }, res)
	})
}