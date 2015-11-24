'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Like = require('../like/like.model');

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
  delay: {
    type: Number,
    min: 1,
    max: 100,
    default: 5
  },
  active: {type: Boolean, default: true},
  added: { type: Date, default: Date.now }
});

TogglrSchema
  .virtual('likes')
  // .set(function(password) {
  //   this._password = password;
  //   this.salt = this.makeSalt();
  //   this.hashedPassword = this.encryptPassword(password);
  // })
  .get(function() {
    return Like.count({togglr: this._id});
  });

module.exports = mongoose.model('Togglr', TogglrSchema);
