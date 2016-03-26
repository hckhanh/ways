var channelController = requireFromRoot('controllers/channel');
var Channel = requireFromRoot('models/channel');
var userMiddleware = requireFromRoot('middlewares/user');
var express = require('express');
var router = express.Router();

var getChannel = function(req,res, next) {
	Channel.findOne({_id: req.params.id})
	.then(function(channel){
		if (channel) {
			req.channel = channel;
			next();
		} else {
			outData({
		        code : responseCode.DATA_NOT_EXISTS,
		        description : "Channel does not exists",
		        response: null
			}, res)
		}
	})
}

router.post("/", userMiddleware.getUserAndRequire ,channelController.postChannel);
router.post("/:id", getChannel, userMiddleware.getUserAndRequire ,channelController.postMessage);
module.exports = router;