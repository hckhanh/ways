var schema = BaseModel.extend({
  content : String,
  ownerId : String,
  channelId : String,
  location : {
  	longitude : String,
  	latitude : String
  }
});


module.exports = User = mongoose.model('message', schema);