/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Stream = require('./stream.model');

exports.register = function(socket) {
  Stream.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Stream.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('stream:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('stream:remove', doc);
}