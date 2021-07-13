"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;
exports.getPostsByAuthor = getPostsByAuthor;
exports.getPostsFromAPI = getPostsFromAPI;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _post = _interopRequireDefault(require("../services/post.service"));

var _response = _interopRequireDefault(require("../utils/response"));

var _codeInternalErrors = _interopRequireDefault(require("../utils/codeInternalErrors"));

var _log4js = _interopRequireDefault(require("log4js"));

require("dotenv").config();

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGER_LEVEL;

function createPost(_x, _x2) {
  return _createPost.apply(this, arguments);
}

function _createPost() {
  _createPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var postToCreate, userId, post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger.info("[createPost controller] INIT");
            _context.prev = 1;
            postToCreate = req.body;
            userId = req.user.id;
            _context.next = 6;
            return _post["default"].createPostService(postToCreate, userId);

          case 6:
            post = _context.sent;

            _response["default"].success(res, post);

            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            logger.error("[createPost controller] ERROR", _context.t0);

            _response["default"].badRequest(res, _codeInternalErrors["default"].PROCESS_NOT_FINISHED, _context.t0.message);

          case 14:
            logger.info("[createPost controller] FINISHED");

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));
  return _createPost.apply(this, arguments);
}

function getPostsByAuthor(_x3, _x4) {
  return _getPostsByAuthor.apply(this, arguments);
}

function _getPostsByAuthor() {
  _getPostsByAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, post;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            logger.info("[getPostsByAuthor controller] INIT");
            _context2.prev = 1;
            userId = req.user.id;
            _context2.next = 5;
            return _post["default"].getPostsByAuthorService(userId);

          case 5:
            post = _context2.sent;

            _response["default"].success(res, post);

            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            logger.error("[getPostsByAuthor controller] ERROR", _context2.t0);

            _response["default"].badRequest(res, _codeInternalErrors["default"].PROCESS_NOT_FINISHED, _context2.t0.message);

          case 13:
            logger.info("[getPostsByAuthor controller] FINISHED");

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));
  return _getPostsByAuthor.apply(this, arguments);
}

function getPostsFromAPI(_x5, _x6) {
  return _getPostsFromAPI.apply(this, arguments);
}

function _getPostsFromAPI() {
  _getPostsFromAPI = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var post;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            logger.info("[getPostsFromAPI controller] INIT");
            _context3.prev = 1;
            _context3.next = 4;
            return _post["default"].getPostsFromAPIService();

          case 4:
            post = _context3.sent;

            _response["default"].success(res, post);

            _context3.next = 12;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            logger.error("[getPostsFromAPI controller] ERROR", _context3.t0);

            _response["default"].badRequest(res, _codeInternalErrors["default"].PROCESS_NOT_FINISHED, _context3.t0.message);

          case 12:
            logger.info("[getPostsFromAPI controller] FINISHED");

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _getPostsFromAPI.apply(this, arguments);
}