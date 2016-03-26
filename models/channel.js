var Message = requireFromRoot('models/message')
var schema = BaseModel.extend({
  name : String,
  type : {
  	type: String,
  	enum : ["PRIVATE", "PUBLIC"],
  	default: "PRIVATE"
  },
  ownerId : String,
  location : {
  	longitude : String,
  	latitude : String
  },
  time_to_live : {
  	type: Number,
  	default: 1800000
  }
});


schema.statics.postChannel = function(data){
	var promise = promiseAdapter.defer();
	var channel = new this(data);
	channel.save()
	.then(function(channel){
		promise.resolve(channel);
	})
	return promise.promise;
}

schema.methods.getMessage = function(data){
	var promise = promiseAdapter.defer();
	var self = this;
	//delete old message
	//
	var promise = promiseAdapter.defer();
	Message.remove({dateCreated : {$lt: ((new Date()).getTime() - self.time_to_live)}})
	.then(function(){
		Message.find({channelId : self._id})
		.then(function(messages){
			promise.resolve(messages)
		})
	})
	return promise.promise;
}


schema.methods.update = function(data){
	// var self = this;
	// var promise = promiseAdapter.defer();
	// Message.remove({})
	// return Message.find("")
}

schema.methods.postMessage = function(data){
	var self = this;
	var promise = promiseAdapter.defer();
	var message = new Message(data);
	message.channelId = self._id;
	message.save()
	.then(function(message){
		promise.resolve(message)
	});

	return promise.promise;
}




module.exports = User = mongoose.model('channel', schema);
