"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _database = _interopRequireDefault(require("./config/database"));

var _routes = _interopRequireDefault(require("./routes"));

var _errorHandlingJWT = _interopRequireDefault(require("./middlewares/errorHandlingJWT"));

var _welcome = _interopRequireDefault(require("./templates/welcome"));

// app nodejs
// Middleware de registrador de solicitudes HTTP
// Cabeceras
_database["default"].connect().then(function () {
  return console.log("Connected to MongoDB...");
})["catch"](function (err) {
  return console.error("Could not connect to MongoDB...", err);
}); // Server express


var app = (0, _express["default"])(); // Middlewares

app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])({
  exposedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Accept-Language", "Authorization"]
}));
app.use(_express["default"]["static"]("public"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.get("/", function (req, res) {
  res.send(_welcome["default"]);
});
app.use(_routes["default"]);
app.use(_errorHandlingJWT["default"]);
var _default = app;
exports["default"] = _default;