'use strict';

var _ = require('lodash');
var Toggle = require('./toggle.model');

// Get list of toggles
exports.index = function(req, res) {
  Toggle.find(function (err, toggles) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(toggles);
  });
};

// Get a single toggle
exports.show = function(req, res) {
  Toggle.findById(req.params.id, function (err, toggle) {
    if(err) { return handleError(res, err); }
    if(!toggle) { return res.status(404).send('Not Found'); }
    return res.json(toggle);
  });
};

// Creates a new toggle in the DB.
exports.create = function(req, res) {
  Toggle.create(req.body, function(err, toggle) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(toggle);
  });
};

// Updates an existing toggle in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Toggle.findById(req.params.id, function (err, toggle) {
    if (err) { return handleError(res, err); }
    if(!toggle) { return res.status(404).send('Not Found'); }
    var updated = _.merge(toggle, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(toggle);
    });
  });
};

// Deletes a toggle from the DB.
exports.destroy = function(req, res) {
  Toggle.findById(req.params.id, function (err, toggle) {
    if(err) { return handleError(res, err); }
    if(!toggle) { return res.status(404).send('Not Found'); }
    toggle.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}