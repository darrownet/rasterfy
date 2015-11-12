'use strict';

var _ = require('lodash');
var Stream = require('./stream.model');
var jimp = require('jimp');
var fs = require('fs');
var url = require('url');

// Get list of streams
exports.index = function(req, res) {
  Stream.find(function (err, streams) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(streams);
  });
};

// Get a single stream
exports.show = function(req, res) {
  Stream.findById(req.params.id, function (err, stream) {
    if(err) { return handleError(res, err); }
    if(!stream) { return res.status(404).send('Not Found'); }
    return res.json(stream);
  });
};

// Creates a new stream in the DB.
exports.create = function(req, res) {
  Stream.create(req.body, function(err, stream) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(stream);
  });
};

// Updates an existing stream in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stream.findById(req.params.id, function (err, stream) {
    if (err) { return handleError(res, err); }
    if(!stream) { return res.status(404).send('Not Found'); }
    var updated = _.merge(stream, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(stream);
    });
  });
};

// Deletes a stream from the DB.
exports.destroy = function(req, res) {
  Stream.findById(req.params.id, function (err, stream) {
    if(err) { return handleError(res, err); }
    if(!stream) { return res.status(404).send('Not Found'); }
    stream.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.upload = function(req, res){
    for (var i = 0; i < req.files.length; i++) {

        var currentFile = req.files[i],
            mime = currentFile.mimetype.match(/image\/.*/),
            gif = currentFile.mimetype.match(/image\/gif/),
            sendObj = {},
            origList = currentFile.originalname.split('.');

        if (mime === null || gif !== null) {
            fs.unlink(currentFile.path);
            if(mime === null){
                sendObj.fileName = 'pitythefool.html';
                sendObj.originalName = 'pitythefool';
            }else{
                sendObj.fileName = 'giffool.html';
                sendObj.originalName = 'giffool';
            }
            res.send(sendObj);

        } else {
            origList.pop();
            sendObj.originalName = origList.join('');

            jimp.read(currentFile.path, function(err, image) {
                if (err) res.send(err);
                var currentRow = 0,
                    arrayFuckYeah = [],
                    wrapStart = '',
                    imgMarkup = '',
                    wrapEnd = '',
                    htmlImg = '',
                    i = 0,
                    fileName;
                image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
                    var red = this.bitmap.data[idx];
                    var green = this.bitmap.data[idx + 1];
                    var blue = this.bitmap.data[idx + 2];
                    var alpha = this.bitmap.data[idx + 3];
                    arrayFuckYeah.push('<p style="background:rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ');"></p>');
                });


                wrapStart = '<html><head><style>body{margin:0;}p{margin:0;padding:0;width:1px;height:1px;float:left;}</style></head><body><div style="width:'+image.bitmap.width+'px; height:'+image.bitmap.height+'px;">';
                imgMarkup = arrayFuckYeah.join("").toString();
                wrapEnd = '</div></body></html>';
                htmlImg = wrapStart+imgMarkup+wrapEnd;


                fileName = 'img_' + Date.now() + '.html'
                sendObj.fileName = fileName;
                fs.unlink(currentFile.path);
                fs.writeFile('./public/downloads/' + fileName, htmlImg, function(err) {
                    res.send(sendObj);
                });
            });
        }
    }
}

exports.download =  function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    res.download('./public/downloads/' + req.params.path, query.originalName + '-rasterfyed.html', function(err) {
        // console.log(err);
        if (req.params.path !== 'pitythefool.html' && req.params.path !== 'giffool.html') {
            fs.unlink('./public/downloads/' + req.params.path);
        }
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
