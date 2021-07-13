"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _createUserValidator = _interopRequireDefault(require("../middlewares/createUserValidator"));

var _loginValidator = _interopRequireDefault(require("../middlewares/loginValidator"));

var _user = require("../controllers/user.controller");

var router = _express["default"].Router();

router.route("/").post(_createUserValidator["default"], _user.createUser);
router.route("/login").post(_loginValidator["default"], _user.login);
module.exports = router;