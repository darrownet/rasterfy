/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Togglr = require('./togglr.model');

exports.register = function(socket) {
  Togglr.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Togglr.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('togglr:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('togglr:remove', doc);
}