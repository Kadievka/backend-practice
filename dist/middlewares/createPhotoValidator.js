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

var createPhotoValidator = function createPhotoValidator(req, res, next) {
  logger.info("[createPhotoValidator] INIT");
  var data = req.body;

  var schema = _joi["default"].object({
    name: _joi["default"].string().required(),
    type: _joi["default"].string().required(),
    path: _joi["default"].string().required(),
    description: _joi["default"].string()
  });

  var _schema$validate = schema.validate(data),
      error = _schema$validate.error;

  logger.info("[createPhotoValidator] FINISH");
  error ? _response["default"].badRequest(res, _codeInternalErrors["default"].VALIDATION_FAILED, error.details[0].message) : next();
};

var _default = createPhotoValidator;
exports["default"] = _default;