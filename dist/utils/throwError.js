"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = throwError;

function throwError(code, message) {
  var error = new Error(message);
  error.code = code;
  throw error;
}