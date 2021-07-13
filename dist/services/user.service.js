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

var _User = _interopRequireDefault(require("../models/User"));

var _codeInternalErrors = _interopRequireDefault(require("../utils/codeInternalErrors"));

var _throwError = _interopRequireDefault(require("../utils/throwError"));

var _log4js = _interopRequireDefault(require("log4js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var logger = _log4js["default"].getLogger();

logger.level = process.env.LOGGER_LEVEL;

var UserService = /*#__PURE__*/function () {
  function UserService() {
    (0, _classCallCheck2["default"])(this, UserService);
  }

  (0, _createClass2["default"])(UserService, null, [{
    key: "createUser",
    value: function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _User["default"].create(user));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "createUserService",
    value: function () {
      var _createUserService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userToRegister) {
        var user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                logger.debug("[createUserService] INIT");
                userToRegister.email.toLowerCase();
                _context2.next = 4;
                return this.getUserByEmail(userToRegister.email);

              case 4:
                user = _context2.sent;

                if (user) {
                  (0, _throwError["default"])(_codeInternalErrors["default"].USER_ALREADY_EXISTS, _codeInternalErrors["default"].USER_ALREADY_EXISTS_MESSAGE);
                }

                _context2.next = 8;
                return this.createUser(userToRegister);

              case 8:
                user = _context2.sent;
                logger.debug("[createUserService] FINISH");
                return _context2.abrupt("return", {
                  _id: user._id,
                  email: user.email
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createUserService(_x2) {
        return _createUserService.apply(this, arguments);
      }

      return createUserService;
    }()
  }, {
    key: "getUserByEmail",
    value: function () {
      var _getUserByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(email) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _User["default"].findOne({
                  email: email
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getUserByEmail(_x3) {
        return _getUserByEmail.apply(this, arguments);
      }

      return getUserByEmail;
    }()
  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
        var throwErrorIfNoExists,
            user,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                throwErrorIfNoExists = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;
                user = null;
                _context4.next = 4;
                return _User["default"].findById(id);

              case 4:
                user = _context4.sent;

                if (!user && throwErrorIfNoExists) {
                  (0, _throwError["default"])(_codeInternalErrors["default"].USER_NO_FOUND, _codeInternalErrors["default"].USER_NO_FOUND_MESSAGE);
                }

                return _context4.abrupt("return", user);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getUserById(_x4) {
        return _getUserById.apply(this, arguments);
      }

      return getUserById;
    }()
  }, {
    key: "loginService",
    value: function () {
      var _loginService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userToLogin) {
        var user, validPassword, token;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                logger.debug("[loginService] INIT");
                userToLogin.email.toLowerCase();
                _context5.next = 4;
                return this.getUserByEmail(userToLogin.email);

              case 4:
                user = _context5.sent;

                if (!user) {
                  _context5.next = 12;
                  break;
                }

                _context5.next = 8;
                return user.verifyPassword(userToLogin.password);

              case 8:
                validPassword = _context5.sent;

                if (!validPassword) {
                  _context5.next = 12;
                  break;
                }

                token = _jsonwebtoken["default"].sign({
                  id: user._id
                }, process.env.JWT_SECRET);
                return _context5.abrupt("return", {
                  _id: user._id,
                  email: user.email,
                  jwt: token
                });

              case 12:
                (0, _throwError["default"])(_codeInternalErrors["default"].UNAUTHORIZED, _codeInternalErrors["default"].UNAUTHORIZED_MESSAGE);
                logger.debug("[loginService] FINISH");

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loginService(_x5) {
        return _loginService.apply(this, arguments);
      }

      return loginService;
    }()
  }]);
  return UserService;
}();

exports["default"] = UserService;