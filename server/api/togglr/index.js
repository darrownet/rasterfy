'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./togglr.controller');
var multer = require('multer');
var upload = multer({
    dest: "./public/uploads/"
});
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', [auth.isAuthenticated(), upload.fields([{name: 'file[0]'},{name: 'file[1]'}])], controller.create);
// router.post('/', [upload.fields([{name: 'file[0]'},{name: 'file[1]'}])], controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
