var Channel = requireFromRoot('models/channel')
var Subcribe = requireFromRoot('models/subcribe')
var User = requireFromRoot('models/user')
 
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
	//get all public channel
	var listChannel = [];
	Channel.find({type: "PUBLIC"})
	.then(function(channels){
		//get list user subcribe 
		listChannel = channels;
		if (req.user) {
			Subcribe.find({
				userId : req.user._id
			})
			.then(function(subcribes){
				var tasks = [];
				_.each(subcribes, function(sub){
					tasks.push(Channel.findOne({_id: sub.channelId})
					.then(function(channel){
						if (channel) {
							var even = _.find(listChannel, function(channell){ 
								return channell._id.equals(channel._id); 
							});
							if (!even) {
								listChannel.push(channel);
								return channel;
							} else {
								return null;
							}
						} else {
							return null;
						}
						
					}));
					
				})

				promiseAdapter.all(tasks)
				.then(function(){
					var getUserTasks = []
					_.each(listChannel, function(channel){
						getUserTasks.push(User.findOne({_id : channel.ownerId})
						.then(function(user){
							channel = channel.toObject();
							channel.user = {
								username: user.username,
								email: user.email,
								avatar: user.avatar,
							}
							return channel;
						}))
					})
					promiseAdapter.all(getUserTasks)
					.then(function(channels){
						outData({
					      code: responseCode.SUCCESS,
					      description : "Success",
					      response: channels
					    }, res)
					})
				})
			})
		} else {
			var getUserTasks = []
			_.each(listChannel, function(channel){
				getUserTasks.push(User.findOne({_id : channel.ownerId})
				.then(function(user){
					channel = channel.toObject();
					channel.user = {
						username: user.username,
						email: user.email,
						avatar: user.avatar,
					}
					return channel;
				}))
			})
			promiseAdapter.all(getUserTasks)
			.then(function(channels){
				outData({
			      code: responseCode.SUCCESS,
			      description : "Success",
			      response: channels
			    }, res)
			})
		}
		
	})

}

exports.subcribe = function(req,res){
	Subcribe.findOne({
		userId : req.user._id,
		channelId : req.channel._id
	})
	.then(function(sub){
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
			fayeClients[0].publish("/" + req.channel._id, message);
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
	req.channel.getMessage()
	.then(function(messages){
		outData({
	      code: responseCode.SUCCESS,
	      description : "Success",
	      response: messages
	    }, res)
	})
}