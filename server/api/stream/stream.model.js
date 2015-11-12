'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StreamSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Stream', StreamSchema);