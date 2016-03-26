var crypto = require('crypto')
 

 var schema = BaseModel.extend({
  avatar : String,
  type : {
    type: String, 
    default: "USER",
    enum: ["USER", "ADMIN"]
  },
  username: String,
  email: String,
  location : {
  	longitude : String,
  	latitude : String
  },
  password: String,
  sessionId: String,
  sessionTime: Number
});

schema.statics.login = function(data, options){
  var promise = promiseAdapter.defer();
	var self = this;
	var condition = {};
	if (data.email) {
		condition.email = data.email;
	} else if(data.username){
		condition.username = data.username;
	}
	self.findOne(condition)
	.then(function(user){
		if (user == null) {
			promise.reject({
	      code: responseCode.DATA_NOT_EXISTS,
	      description : "Email does not exists",
	      response: null
	    });
		} else {
			var md5 = crypto.createHash('md5');
			md5.update(data.password);
			hexPass = md5.digest("hex");
			if (hexPass != user.password) {
				promise.reject({
		      code: responseCode.UNAUTHORIZED,
		      description : "The email address or password is incorrect",
		      response: null
		    });
			} else {
				user.sessionTime = (new Date()).getTime();
				var md5session = crypto.createHash('md5');
				md5session.update(user._id + user.sessionTime);
 	 			user.sessionId = md5session.digest("hex");
				user.save()
				.then(function(user) {
					promise.reject({
			      code: responseCode.SUCCESS,
			      description : "Success",
			      response: user
			    });
				});	
			}
		}
	}, function(err){
    promise.reject({
      code: responseCode.FAIL,
      description : err,
      response: null
    });
  });

	return promise.promise;
}


schema.statics.register = function(params, options){
  var self = this;
  var promise = promiseAdapter.defer();
  self.findOne({email: params.email})
  .then(function(user){
  	if (user) {
      promise.reject({
          code: responseCode.DATA_EXSISTS,
          description : "Email has been taken by another user",
          response: null
      });
    } else {
     var md5 = crypto.createHash('md5');
      md5.update(params.password);
      var hexPass = md5.digest("hex");
  
      var user = new self({
        email : params.email,
        username : params.username,
        password : hexPass
      });
      
      user.sessionTime = (new Date()).getTime();

			var md5session = crypto.createHash('md5');
			md5session.update(user._id + user.sessionTime);
	 		user.sessionId = md5session.digest("hex");
	 		user.save()
			.then(function(user) {
				promise.resolve({
		      code: responseCode.SUCCESS,
		      description : "Success",
		      response: user
		    });
			}, function(err){
				promise.reject({
		      code: responseCode.FAIL,
		      description : err,
		      response: null
	    	});
			});
    }
  },function(err){
    promise.reject({
      code: responseCode.FAIL,
      description : err,
      response: null
    });
  });

  return promise.promise;
}

module.exports = User = mongoose.model('user', schema);
