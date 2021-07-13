"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

require("dotenv").config();

var app = (0, _express["default"])();
app.use("/user", require("./user.routes"));
app.use("/photos", require("./photo.routes"));
app.use("/posts", require("./post.routes"));
var _default = app;
exports["default"] = _default;