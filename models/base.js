var schema = new mongoose.Schema({
  dateCreated: Number,
  timestamp: Number
});
schema.pre("save", function(next){
 this.dateCreated = (new Date()).getTime();
 this.timestamp = this.dateCreated;
 next();
});
schema.post("find", function(result){
  result = _.map(result, function(item) { 
    item.timestamp = undefined;
    item.__t = undefined;
    item.__v = undefined;
    return item;
  });
});
schema.post("save", function(result){
  result.timestamp = undefined;
  result.__t = undefined;
  result.__v = undefined;
});
schema.post("findOne", function(result) {
  if (result) {
    result.timestamp = undefined;  
  };
});

schema.statics.findList = function(conditions,options) {
  var self = this;
  var options = options || { 
    limit : 20,
    timestamp: 0,
    sort:{},
    order : "asc"
  };
  conditions = conditions || {}
  options.limit = 20;

  options.sort = options.sort || {};
 
  options.order = options.order || "asc";
  if (!options.timestamp) {
    if(options.order.toUpperCase() == "ASC")
      options.timestamp = 0;
    else 
      options.timestamp = (new Date()).getTime();
  }
  options.order = options.order.toLowerCase();
  return self.find(conditions).count()
    .then(function(count) {
      conditions.timestamp = options.order == "asc" ? {$gt: (options.timestamp)} : {$lt: (options.timestamp)};
      if (options.order == "asc") {
        options.sort = {
          timestamp : 1
        }
      } else {
        options.sort = {
          timestamp : -1
        }
      }
      return self.find(conditions).sort(options.sort).limit(options.limit)
        .then(function(results) {
          return {
            data : results,
            timestamp : ((results.length == options.limit) ? results[results.length-1].dateCreated : null),
            order : options.order,
            total : count
          };
        });    
    });
}
schema.statics.findItem = function(conditions,options) {
  var self = this;
  conditions = conditions || {}
  return self.findOne(conditions)
    .then(function(demos) {
      return demos;
    });
}
module.exports = schema;