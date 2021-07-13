"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _createPhotoValidator = _interopRequireDefault(require("../middlewares/createPhotoValidator"));

var _paginateValidator = _interopRequireDefault(require("../middlewares/paginateValidator"));

var _photo = require("../controllers/photo.controller");

var router = _express["default"].Router();

router.route("/").post((0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
}), _createPhotoValidator["default"], _photo.createPhoto).get((0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
}), _paginateValidator["default"], _photo.getPhotosFromAPI);
router.route("/:name").get((0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
}), _photo.getOnePhotoByAuthor);
module.exports = router;