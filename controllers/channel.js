var Channel = requireFromRoot('models/channel')
 
exports.postChannel = function(req,res){
	console.log(req.user)
	var params = _.pick(req.body, "name", "time_to_live", "location")
	params.ownerId = req.user._id;
	Channel.postChannel(params)
	.then(function(channel){
		outData({
	      code: responseCode.SUCCESS,
	      description : "Success",
	      response: channel
	    }, res)
	})
}


exports.postMessage = function(req, res){
	checkParams(["content"])
	.then(function(){
		var params = _.pick(req.body, "content", "file", "location");
		console.log(req.channel)
		req.channel.postMessage(params)
		.then(function(message){
			outData({
		      code: responseCode.SUCCESS,
		      description : "Success",
		      response: message
		    }, res)
		})
	}, function(err){
		outData(err, res);
	})
}