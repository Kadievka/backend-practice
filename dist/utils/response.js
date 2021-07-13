"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var CODE_OK = 200;
var CODE_BAD_REQUEST = 400;
var CODE_UNAUTHORIZED = 401;
var CODE_SERVER_ERROR = 500;
var SUCCESS_MESSAGE = "Request successful";

var Responses = /*#__PURE__*/function () {
  function Responses() {
    (0, _classCallCheck2["default"])(this, Responses);
  }

  (0, _createClass2["default"])(Responses, null, [{
    key: "badRequest",
    value: function badRequest(res, errorCode, message) {
      res.status(CODE_BAD_REQUEST).json({
        success: false,
        code: errorCode,
        message: message
      });
    }
  }, {
    key: "serverError",
    value: function serverError(res, errorCode, message) {
      res.status(CODE_SERVER_ERROR).json({
        success: false,
        code: errorCode,
        message: message
      });
    }
  }, {
    key: "success",
    value: function success(res, data) {
      res.status(CODE_OK).json({
        success: true,
        data: data,
        message: SUCCESS_MESSAGE
      });
    }
  }, {
    key: "unauthorized",
    value: function unauthorized(res, errorCode, message, data) {
      res.status(CODE_UNAUTHORIZED).json({
        success: false,
        code: errorCode,
        message: message,
        data: data
      });
    }
  }]);
  return Responses;
}();

exports["default"] = Responses;