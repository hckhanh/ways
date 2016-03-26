var sequence = require('when/sequence')
  , pipeline = require('when/pipeline')
  , nodefn = require('when/node')

module.exports = {
  defer: function() {
    return when.defer();
  },

  all: function(tasks) {
    return when.all(tasks);
  },

  sequence: function(tasks) {
    return sequence(tasks)
  },

  pipeline: function(tasks) {
    return pipeline(tasks);
  },

  promise: function(fn) {
    return when.promise(fn);
  },

  resolve: function(value) {
    return when.resolve(value);
  },

  reject: function(error) {
    return when.reject(error)
  },

  promisifyAll: function(obj) {
    return nodefn.liftAll(obj);
  },

  promisify: function(cb) {
    return nodefn.lift(cb);
  }
};