"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _log4js = _interopRequireDefault(require("log4js"));

var _response = _interopRequireDefault(require("../utils/response"));

var _codeInternalErrors = _interopRequireDefault(require("../utils/codeInternalErrors"));

require("dotenv").config();

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGER_LEVEL;

var errorHandlingJWT = function errorHandlingJWT(err, req, res, next) {
  logger.info("[errorHandlingJWT] INIT");
  logger.info("[errorHandlingJWT] err: ".concat(err));

  if (err.name === "UnauthorizedError") {
    _response["default"].unauthorized(res, _codeInternalErrors["default"].UNAUTHORIZED, _codeInternalErrors["default"].UNAUTHORIZED_MESSAGE);
  }

  _response["default"].badRequest(res, _codeInternalErrors["default"].PROCESS_NOT_FINISHED, err.message);

  logger.info("[errorHandlingJWT] FINISH");
};

var _default = errorHandlingJWT;
exports["default"] = _default;