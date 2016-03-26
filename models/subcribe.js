var schema = BaseModel.extend({
  channelId : String,
  userId : String,
  isGetNotification : {
  	type : Boolean,
  	default: true
  }
});


module.exports = User = mongoose.model('subcribe', schema);