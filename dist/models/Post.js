"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _mongooseDelete = _interopRequireDefault(require("mongoose-delete"));

var postSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  message: {
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
postSchema.plugin(_mongoosePaginate["default"]);
postSchema.plugin(_mongooseDelete["default"], {
  overrideMethods: true
});

var Post = _mongoose["default"].model("Post", postSchema);

var _default = Post;
exports["default"] = _default;