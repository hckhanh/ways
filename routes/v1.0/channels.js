var channelController = requireFromRoot('controllers/channel');
var userMiddleware = requireFromRoot('middlewares/user');
var express = require('express');
var router = express.Router();

router.post("/", userMiddleware.getUserAndRequire ,channelController.postChannel);
module.exports = router;