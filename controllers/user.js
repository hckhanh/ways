var User = requireFromRoot('models/user')


exports.login = function(req, res){
	var params = _.pick(req.body, "username", "email", "password", "location");

	User.login(params)
	.then(function(user){
		outData(user, res);
	}, function(err){
		outData(err, res);
	})
}