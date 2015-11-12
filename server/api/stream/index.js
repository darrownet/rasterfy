'use strict';

var express = require('express');
var controller = require('./stream.controller');
var multer = require('multer');
var upload = multer({
    dest: "./public/uploads/"
});
var router = express.Router();

router.get('/:path', controller.download);
router.post('/', upload.array('file', 1), controller.upload);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
