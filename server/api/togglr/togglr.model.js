'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TogglrSchema = new Schema({
  caption: {
    type: String,
    maxlength: 140,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [
    {
      data: Buffer,
      contentType: String
    }
  ],
  active: {type: Boolean, default: true},
  added: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Togglr', TogglrSchema);
