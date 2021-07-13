"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _user = _interopRequireDefault(require("./user.service"));

var _log4js = _interopRequireDefault(require("log4js"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _defaultConstants = _interopRequireDefault(require("../utils/defaultConstants"));

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGER_LEVEL;

var PostService = /*#__PURE__*/function () {
  function PostService() {
    (0, _classCallCheck2["default"])(this, PostService);
  }

  (0, _createClass2["default"])(PostService, null, [{
    key: "createPost",
    value: function () {
      var _createPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(postToCreate) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _Post["default"].create(postToCreate));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createPost(_x) {
        return _createPost.apply(this, arguments);
      }

      return createPost;
    }()
  }, {
    key: "createPostService",
    value: function () {
      var _createPostService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(postToCreate, userId) {
        var user, post;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                logger.debug("[createPostService] INIT");
                _context2.next = 3;
                return _user["default"].getUserById(userId, true);

              case 3:
                user = _context2.sent;
                postToCreate.author = user._id;
                post = this.createPost(postToCreate);
                logger.debug("[createPostService] FINISH");
                return _context2.abrupt("return", post);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createPostService(_x2, _x3) {
        return _createPostService.apply(this, arguments);
      }

      return createPostService;
    }()
  }, {
    key: "getPostsByAuthorService",
    value: function getPostsByAuthorService(userId) {
      return _Post["default"].find({
        author: userId
      }).select({
        _id: 1,
        title: 1,
        message: 1
      });
    }
  }, {
    key: "getPostsFromAPIService",
    value: function () {
      var _getPostsFromAPIService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                logger.info("[getPostsFromAPI] :: INIT");
                return _context3.abrupt("return", (0, _nodeFetch["default"])("".concat(process.env.JPH_API, "/posts")).then(function (response) {
                  return response.json();
                }).then(function (json) {
                  return json.map(function (item) {
                    item._id = item.id;
                    item.message = item.body;
                    item.body = undefined;
                    return item;
                  }).filter(function (item) {
                    return item.id < _defaultConstants["default"].POSTS_LIMIT_NUMBER;
                  });
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getPostsFromAPIService() {
        return _getPostsFromAPIService.apply(this, arguments);
      }

      return getPostsFromAPIService;
    }()
  }]);
  return PostService;
}();

exports["default"] = PostService;