var Channel = requireFromRoot('models/channel')
var Subcribe = requireFromRoot('models/subcribe')
 
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

exports.getListChannel = function(req,res){

}

exports.subcribe = function(req,res){
	Subcribe.findOne({
		userId : req.user._id,
		channelId : req.channel._id
	})
	.then(function(sub){
		console.log(sub)
		if (sub) {
			outData({
				code: responseCode.DATA_EXSISTS,
			      description : "You have subcribed this channel",
			      response: null
			}, res)
		} else {
			var subcribe = new Subcribe({
				userId : req.user._id,
				channelId : req.channel._id
			})

			subcribe.save()
			.then(function(){
				outData({
			      code: responseCode.SUCCESS,
			      description : "Success",
			      response: null
			    }, res)
			})
		}
	})
}

exports.unsubcribe = function(req,res){
	Subcribe.findOne({
		userId : req.user._id,
		channelId : req.channel._id
	})
	.then(function(sub){
		if (sub) {
			sub.remove()
			.then(function(){
				outData({
			      code: responseCode.SUCCESS,
			      description : "Success",
			      response: null
			    }, res)
			})
		} else {
			outData({
				code: responseCode.DATA_NOT_EXISTS,
			      description : "You have not subcribed this channel",
			      response: null
			}, res)
		}
	})
}

exports.postMessage = function(req, res){
	checkParams(["content"])
	.then(function(){
		var params = _.pick(req.body, "content", "file", "location");
		params.ownerId = req.user._id;
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

exports.getMessage = function(req,res){
	console.log(req.channel)
	req.channel.getMessage()
	.then(function(messages){
		outData({
	      code: responseCode.SUCCESS,
	      description : "Success",
	      response: messages
	    }, res)
	})
}