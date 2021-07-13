"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _mongooseDelete = _interopRequireDefault(require("mongoose-delete"));

var photoSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  author: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});
photoSchema.plugin(_mongoosePaginate["default"]);
photoSchema.plugin(_mongooseDelete["default"], {
  overrideMethods: true
});

var Photo = _mongoose["default"].model("Photo", photoSchema);

var _default = Photo;
exports["default"] = _default;