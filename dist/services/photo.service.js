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

var _Photo = _interopRequireDefault(require("../models/Photo"));

var _user = _interopRequireDefault(require("./user.service"));

var _defaultConstants = _interopRequireDefault(require("../utils/defaultConstants"));

var _log4js = _interopRequireDefault(require("log4js"));

var _throwError = _interopRequireDefault(require("../utils/throwError"));

var _codeInternalErrors = _interopRequireDefault(require("../utils/codeInternalErrors"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _paginateUtil = _interopRequireDefault(require("../utils/paginateUtil"));

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGER_LEVEL;

var PhotoService = /*#__PURE__*/function () {
  function PhotoService() {
    (0, _classCallCheck2["default"])(this, PhotoService);
  }

  (0, _createClass2["default"])(PhotoService, null, [{
    key: "createPhoto",
    value: function () {
      var _createPhoto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(photoToCreate) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _Photo["default"].create(photoToCreate));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createPhoto(_x) {
        return _createPhoto.apply(this, arguments);
      }

      return createPhoto;
    }()
  }, {
    key: "createPhotoService",
    value: function () {
      var _createPhotoService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(photoToCreate, userId) {
        var user, photo;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                logger.debug("[createPhotoService] INIT");
                _context2.next = 3;
                return _user["default"].getUserById(userId, true);

              case 3:
                user = _context2.sent;
                photoToCreate.author = user._id;
                photo = this.createPhoto(photoToCreate);
                logger.debug("[createPhotoService] FINISH");
                return _context2.abrupt("return", photo);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createPhotoService(_x2, _x3) {
        return _createPhotoService.apply(this, arguments);
      }

      return createPhotoService;
    }()
  }, {
    key: "getOnePhotoByAuthorService",
    value: function () {
      var _getOnePhotoByAuthorService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(name, userId) {
        var splittedName, type, photoName;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                logger.debug("[getOnePhotoByAuthorService] INIT");
                splittedName = name.split(".");
                type = splittedName.pop();
                photoName = splittedName.join(".");
                logger.debug("[getOnePhotoByAuthorService] photoName: ".concat(photoName, ", type: ").concat(type, ", userId: ").concat(userId));
                logger.debug("[getOnePhotoByAuthorService] FINISH");
                return _context3.abrupt("return", this.getOnePhotoByNameTypeAndAuthor(photoName, type, userId, true));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getOnePhotoByAuthorService(_x4, _x5) {
        return _getOnePhotoByAuthorService.apply(this, arguments);
      }

      return getOnePhotoByAuthorService;
    }()
  }, {
    key: "getOnePhotoByNameTypeAndAuthor",
    value: function () {
      var _getOnePhotoByNameTypeAndAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(name, type, userId) {
        var throwErrorIfNoExists,
            photo,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                throwErrorIfNoExists = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : false;
                photo = null;
                _context4.next = 4;
                return _Photo["default"].findOne({
                  name: name,
                  type: type,
                  author: userId
                });

              case 4:
                photo = _context4.sent;

                if (!photo && throwErrorIfNoExists) {
                  (0, _throwError["default"])(_codeInternalErrors["default"].PHOTO_NO_FOUND, _codeInternalErrors["default"].PHOTO_NO_FOUND_MESSAGE);
                }

                return _context4.abrupt("return", photo);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getOnePhotoByNameTypeAndAuthor(_x6, _x7, _x8) {
        return _getOnePhotoByNameTypeAndAuthor.apply(this, arguments);
      }

      return getOnePhotoByNameTypeAndAuthor;
    }()
  }, {
    key: "getPhotosByAuthorService",
    value: function getPhotosByAuthorService(userId, optionsRequest) {
      logger.debug("[getPhotosByAuthorService] :: INIT");
      logger.debug("[getPhotosByAuthorService] optionsRequest: ".concat(JSON.stringify(optionsRequest)));
      var query = {
        author: userId
      };
      var options = {
        select: {},
        sort: {
          createdAt: optionsRequest.sort || -1
        },
        page: optionsRequest.page || 1,
        limit: optionsRequest.limit || _defaultConstants["default"].PHOTOS_LIMIT_NUMBER
      };
      logger.debug("[getPhotosByAuthorService] :: FINISH");
      return _Photo["default"].paginate(query, options);
    }
  }, {
    key: "getPhotosFromAPIService",
    value: function () {
      var _getPhotosFromAPIService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(optionsRequest) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                logger.debug("[getPhotosFromAPIService] :: INIT");
                logger.debug("[getPhotosFromAPIService] optionsRequest: ".concat(JSON.stringify(optionsRequest)));
                return _context5.abrupt("return", (0, _nodeFetch["default"])("".concat(process.env.JPH_API, "/photos")).then(function (response) {
                  return response.json();
                }).then(function (photos) {
                  return (0, _paginateUtil["default"])(photos || [], optionsRequest.limit || _defaultConstants["default"].PHOTOS_LIMIT_NUMBER, optionsRequest.page || 1);
                }));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getPhotosFromAPIService(_x9) {
        return _getPhotosFromAPIService.apply(this, arguments);
      }

      return getPhotosFromAPIService;
    }()
  }]);
  return PhotoService;
}();

exports["default"] = PhotoService;