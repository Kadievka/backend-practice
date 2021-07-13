"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _log4js = _interopRequireDefault(require("log4js"));

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGER_LEVEL;

var paginateUtil = function paginateUtil(array, limit) {
  var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  logger.info("[paginateUtil] INIT");
  logger.info("[paginateUtil] docs: ".concat(JSON.stringify(array)));
  logger.info("[paginateUtil] limit: ".concat(limit));
  logger.info("[paginateUtil] page: ".concat(page));
  var result = {
    docs: [],
    total: 0,
    limit: limit,
    page: page,
    pages: 1
  };
  logger.info("[paginateUtil] result: ".concat(JSON.stringify(result)));

  if (array) {
    result.total = array.length;
    result.pages = Math.ceil(result.total / result.limit);
    var init = result.limit * (result.page - 1);
    var end = result.limit * result.page;
    logger.info("[paginateUtil] init: ".concat(init));
    logger.info("[paginateUtil] end: ".concat(end));

    for (var i = init; i < end; i++) {
      //logger.info(`[paginateUtil] array[${i}]: ${array[i]}`);
      if (array[i]) result.docs.push(array[i]);
    }
  }

  logger.info("[paginateUtil] result: ".concat(JSON.stringify(result)));
  logger.info("[paginateUtil] FINISH");
  return result;
};

var _default = paginateUtil;
exports["default"] = _default;