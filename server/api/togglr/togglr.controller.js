'use strict';

var _ = require('lodash');
var Togglr = require('./togglr.model');
var fs = require('fs');
var Jimp = require('Jimp');

// Get list of togglrs
exports.index = function(req, res) {
  Togglr.find().select('-images').exec(function (err, togglrs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(togglrs);
  });
};

// Get a single togglr
exports.show = function(req, res) {
  Togglr.findById(req.params.id, function (err, togglr) {
    if(err) { return handleError(res, err); }
    if(!togglr) { return res.status(404).send('Not Found'); }
    var togglrJson = togglr.toObject();
    _.forEach(togglr.images, function(i, x){
      togglrJson.images[x].image = i.data.toString('base64');
      delete togglrJson.images[x].data;
    });
    return res.json(togglrJson);
  });
};

// Creates a new togglr in the DB.
exports.create = function(req, res) {
  // return res.status(200).json(req.files)
  var togglr = _.merge(new Togglr(), req.body),
      files = [req.files['file[0]'][0],req.files['file[1]'][0]];
  togglr.images = [];
  togglr.user = req.user._id;

  // REMOVE THIS LATER!!!!!!
  togglr.caption = 'test';

  _.forEach(files, function(f){
    Jimp.read(f.path, function (err, image) {
      var i = {};
      i.contentType = f.mimetype;
      image.resize(420,420)
        .getBuffer(i.contentType, function(error, buffer){
          i.data = buffer;
          togglr.images.push(i);
          if(togglr.images.length === 2){
            togglr.save(function (err) {
              if (err) { return handleError(res, err); }
              return res.status(200).json(togglr);
            });
          }
        });
    });
  });
};

// Updates an existing togglr in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Togglr.findById(req.params.id, function (err, togglr) {
    if (err) { return handleError(res, err); }
    if(!togglr) { return res.status(404).send('Not Found'); }
    var updated = _.merge(togglr, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(togglr);
    });
  });
};

// Deletes a togglr from the DB.
exports.destroy = function(req, res) {
  Togglr.findById(req.params.id, function (err, togglr) {
    if(err) { return handleError(res, err); }
    if(!togglr) { return res.status(404).send('Not Found'); }
    togglr.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Get list of togglrs separated by user
exports.byUsers = function(req, res) {
  Togglr.aggregate(
    [
      {$group: { _id: "$user", totals: { $sum: 1 }}}
      // {$match: { totalPop: { $gte: 10*1000*1000 }}}
    ])
    .exec(function (err, togglrs) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(togglrs);
    });
};


// Get list of togglrs for single user
exports.byUser = function(req, res) {
  Togglr.find({'user':req.params.id})
    .select('_id title description added')
    .limit(10)
    .sort({added: 1})
    .exec(function (err, togglrs) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(togglrs);
    });
};


function handleError(res, err) {
  return res.status(500).send(err);
}
