'use strict';

var _ = require('lodash');
var Togglr = require('./togglr.model');
var fs = require('fs');
var Jimp = require('Jimp');

// Get list of togglrs
exports.index = function(req, res) {
  Togglr.find(function (err, togglrs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(togglrs);
  });
};

// Get a single togglr
exports.show = function(req, res) {
  Togglr.findById(req.params.id, function (err, togglr) {
    if(err) { return handleError(res, err); }
    if(!togglr) { return res.status(404).send('Not Found'); }
    return res.json(togglr);
  });
};

// Creates a new togglr in the DB.
exports.create = function(req, res) {
  var togglr = _.merge(new Togglr(), req.body);
  togglr.images = [];
  // console.log(req);
  // togglr.user = req.user._id;
  _.forEach(req.files, function(f){
    Jimp.read(f.path, function (err, image) {
      var i = {};
      i.contentType = f.mimetype;
      // i.data = fs.readFileSync(f.path);
      image.getBuffer(i.contentType, function(error, buffer){
        i.data = buffer;
        togglr.images.push(i);
        togglr.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.status(200).json(togglr);
        });
      });
    });
  });
  // togglr.save(function (err) {
  //   if (err) { return handleError(res, err); }
  //   return res.status(200).json(togglr);
  // });
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

function handleError(res, err) {
  return res.status(500).send(err);
}
