"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseBcrypt = _interopRequireDefault(require("mongoose-bcrypt"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _mongooseDelete = _interopRequireDefault(require("mongoose-delete"));

var userSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  }
}, {
  timestamps: true
});
userSchema.plugin(_mongooseBcrypt["default"]);
userSchema.plugin(_mongoosePaginate["default"]);
userSchema.plugin(_mongooseDelete["default"], {
  overrideMethods: true
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;