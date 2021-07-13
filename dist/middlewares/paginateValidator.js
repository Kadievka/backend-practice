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

var _defaultConstants = _interopRequireDefault(require("../utils/defaultConstants"));

require("dotenv").config();

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGER_LEVEL;

var paginateValidator = function paginateValidator(req, res, next) {
  var _Joi$number;

  logger.info("[paginateValidator] INIT");
  var data = req.query;
  logger.info("[paginateValidator] data: ".concat(JSON.stringify(data)));

  if (data.sort) {
    data.sort = data.sort.toUpperCase();
    data.sort = data.sort === _defaultConstants["default"].ASC ? 1 : -1;
  } else {
    data.sort = -1;
  }

  data.page = data.page ? parseInt(data.page) : 1;
  data.limit = data.limit ? parseInt(data.limit) : _defaultConstants["default"].PHOTOS_LIMIT_NUMBER;
  var validValuesToSort = [-1, 1];

  var schema = _joi["default"].object({
    sort: (_Joi$number = _joi["default"].number()).valid.apply(_Joi$number, validValuesToSort),
    page: _joi["default"].number().integer(),
    limit: _joi["default"].number().integer()
  });

  var _schema$validate = schema.validate(data),
      error = _schema$validate.error;

  logger.info("[paginateValidator] FINISH");
  error ? _response["default"].badRequest(res, _codeInternalErrors["default"].VALIDATION_FAILED, error.details[0].message) : next();
};

var _default = paginateValidator;
exports["default"] = _default;