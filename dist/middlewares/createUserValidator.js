"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _response = _interopRequireDefault(require("../utils/response"));

var _codeInternalErrors = _interopRequireDefault(require("../utils/codeInternalErrors"));

var _log4js = _interopRequireDefault(require("log4js"));

require("dotenv").config();

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGER_LEVEL;

var createUserValidator = function createUserValidator(req, res, next) {
  logger.info("[createUserValidator] INIT");
  var data = req.body;

  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(8).required(),
    confirmPassword: _joi["default"].string().min(8).required().valid(_joi["default"].ref("password"))
  });

  var _schema$validate = schema.validate(data),
      error = _schema$validate.error;

  logger.info("[createUserValidator] FINISH");
  error ? _response["default"].badRequest(res, _codeInternalErrors["default"].VALIDATION_FAILED, error.details[0].message) : next();
};

var _default = createUserValidator;
exports["default"] = _default;