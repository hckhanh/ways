var express = require('express');
var router = express.Router();
var userController = requireFromRoot("controllers/user");
//var userMiddleware = requireFromRoot("middlewares/user");


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var checkLoginParams = function(req,res, next){
	if (!req.body.username && !req.body.email) {
		outData({
      code: responseCode.INVALID_PARAMS,
      description :  "Missing username or email",
      response: null
    },res);
	} else {
		if (!req.body.password) {
			outData({
	      code: responseCode.INVALID_PARAMS,
	      description :  "Missing password",
	      response: null
	    },res);
		} else {
			next();
		}
	}
}

var checkRegisterParams = function(req,res,next){
	checkParams(req,res, ["email","password","username"])
	.then(function(){
		next();
	}, function(err){
		outData(err,res)
	});
}


router.post("/login", checkLoginParams ,userController.login);

//router.post("/register", checkRegisterParams, userController.register);

// router.put("/",	userMiddleware.getUserAndRequire, userController.edit);

// router.post("/forget", userController.forgetPassword);

// router.post("/logout",	userMiddleware.getUserAndRequire, userController.logout);


module.exports = router;
