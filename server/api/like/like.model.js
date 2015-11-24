'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  togglr: {
    type: Schema.Types.ObjectId,
    ref: 'Togglr',
    required: true
  }
});

module.exports = mongoose.model('Like', LikeSchema);
