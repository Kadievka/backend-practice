"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv").config();

var swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend-Practice-Project",
      version: "0.1",
      description: "Back-end-Practice-Project exposed routes swagger documentation."
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          "in": "header",
          bearerFormat: "JWT"
        }
      }
    }
  },
  servers: [{
    url: "".concat(process.env.URL_MAIN_APP),
    description: "Route for general services"
  }],
  apis: ["".concat(__dirname, "/../routes/user.routes.js"), "".concat(__dirname, "/../routes/post.routes.js"), "".concat(__dirname, "/../routes/photo.routes.js")]
};
var _default = swaggerOptions;
exports["default"] = _default;