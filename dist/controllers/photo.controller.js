"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPhoto = createPhoto;
exports.getOnePhotoByAuthor = getOnePhotoByAuthor;
exports.getPhotosByAuthor = getPhotosByAuthor;
exports.getPhotosFromAPI = getPhotosFromAPI;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _photo = _interopRequireDefault(require("../services/photo.service"));

var _response = _interopRequireDefault(require("../utils/response"));

var _codeInternalErrors = _interopRequireDefault(require("../utils/codeInternalErrors"));

var _log4js = _interopRequireDefault(require("log4js"));

require("dotenv").config();

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGER_LEVEL;

function createPhoto(_x, _x2) {
  return _createPhoto.apply(this, arguments);
}

function _createPhoto() {
  _createPhoto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var photoToCreate, userId, photo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger.info("[createPhoto controller] INIT");
            _context.prev = 1;
            photoToCreate = req.body;
            userId = req.user.id;
            _context.next = 6;
            return _photo["default"].createPhotoService(photoToCreate, userId);

          case 6:
            photo = _context.sent;

            _response["default"].success(res, photo);

            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            logger.error("[createPhoto controller] ERROR", _context.t0);

            _response["default"].badRequest(res, _codeInternalErrors["default"].PROCESS_NOT_FINISHED, _context.t0.message);

          case 14:
            logger.info("[createPhoto controller] FINISHED");

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));
  return _createPhoto.apply(this, arguments);
}

function getOnePhotoByAuthor(_x3, _x4) {
  return _getOnePhotoByAuthor.apply(this, arguments);
}

function _getOnePhotoByAuthor() {
  _getOnePhotoByAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, name, photo;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            logger.info("[createPhoto controller] INIT");
            _context2.prev = 1;
            userId = req.user.id;
            name = req.params.name;
            _context2.next = 6;
            return _photo["default"].getOnePhotoByAuthorService(name, userId);

          case 6:
            photo = _context2.sent;
            res.sendFile(photo.path);
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);
            logger.error("[createPhoto controller] ERROR", _context2.t0);

            _response["default"].badRequest(res, _codeInternalErrors["default"].PROCESS_NOT_FINISHED, _context2.t0.message);

          case 14:
            logger.info("[createPhoto controller] FINISHED");

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 10]]);
  }));
  return _getOnePhotoByAuthor.apply(this, arguments);
}

function getPhotosByAuthor(_x5, _x6) {
  return _getPhotosByAuthor.apply(this, arguments);
}

function _getPhotosByAuthor() {
  _getPhotosByAuthor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var userId, options, photo;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            logger.info("[getPhotosByAuthor controller] INIT");
            _context3.prev = 1;
            userId = req.user.id;
            options = req.query;
            _context3.next = 6;
            return _photo["default"].getPhotosByAuthorService(userId, options);

          case 6:
            photo = _context3.sent;

            _response["default"].success(res, photo);

            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            logger.error("[getPhotosByAuthor controller] ERROR", _context3.t0);

            _response["default"].badRequest(res, _codeInternalErrors["default"].PROCESS_NOT_FINISHED, _context3.t0.message);

          case 14:
            logger.info("[getPhotosByAuthor controller] FINISHED");

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return _getPhotosByAuthor.apply(this, arguments);
}

function getPhotosFromAPI(_x7, _x8) {
  return _getPhotosFromAPI.apply(this, arguments);
}

function _getPhotosFromAPI() {
  _getPhotosFromAPI = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var options, photos;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            logger.info("[getPhotosFromAPI controller] INIT");
            _context4.prev = 1;
            options = req.query;
            _context4.next = 5;
            return _photo["default"].getPhotosFromAPIService(options);

          case 5:
            photos = _context4.sent;

            _response["default"].success(res, photos);

            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            logger.error("[getPhotosFromAPI controller] ERROR", _context4.t0);

            _response["default"].badRequest(res, _codeInternalErrors["default"].PROCESS_NOT_FINISHED, _context4.t0.message);

          case 13:
            logger.info("[getPhotosFromAPI controller] FINISHED");

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));
  return _getPhotosFromAPI.apply(this, arguments);
}