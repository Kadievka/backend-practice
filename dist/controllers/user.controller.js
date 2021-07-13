"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = createUser;
exports.login = login;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../services/user.service"));

var _response = _interopRequireDefault(require("../utils/response"));

var _codeInternalErrors = _interopRequireDefault(require("../utils/codeInternalErrors"));

var _log4js = _interopRequireDefault(require("log4js"));

require("dotenv").config();

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGER_LEVEL;

function createUser(_x, _x2) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userToRegister, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger.info("[createUser controller] INIT");
            _context.prev = 1;
            userToRegister = req.body;
            _context.next = 5;
            return _user["default"].createUserService(userToRegister);

          case 5:
            user = _context.sent;

            _response["default"].success(res, user);

            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            logger.error("[createUser controller] ERROR", _context.t0);

            _response["default"].badRequest(res, _codeInternalErrors["default"].PROCESS_NOT_FINISHED, _context.t0.message);

          case 13:
            logger.info("[createUser controller] FINISHED");

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createUser.apply(this, arguments);
}

function login(_x3, _x4) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userToLogin, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            logger.info("[login controller] INIT");
            _context2.prev = 1;
            userToLogin = req.body;
            _context2.next = 5;
            return _user["default"].loginService(userToLogin);

          case 5:
            user = _context2.sent;

            _response["default"].success(res, user);

            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            logger.error("[login controller] ERROR", _context2.t0);

            _response["default"].badRequest(res, _codeInternalErrors["default"].PROCESS_NOT_FINISHED, _context2.t0.message);

          case 13:
            logger.info("[login controller] FINISHED");

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));
  return _login.apply(this, arguments);
}