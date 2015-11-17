'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TogglrSchema = new Schema({
  name: String,
  info: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  images: [
    {
      data: Buffer,
      contentType: String
    }
  ],
  active: Boolean
});

module.exports = mongoose.model('Togglr', TogglrSchema);
