"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _createPostValidator = _interopRequireDefault(require("../middlewares/createPostValidator"));

var _post = require("../controllers/post.controller");

var router = _express["default"].Router();

router.route("/").post((0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
}), _createPostValidator["default"], _post.createPost).get((0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
}), _post.getPostsFromAPI);
module.exports = router;