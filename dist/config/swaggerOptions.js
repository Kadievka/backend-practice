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
      description: "Backend-Practice-Project exposed routes swagger documentation."
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
    url: "http://{HOST}:{PORT}",
    description: "Route for general services",
    variables: {
      HOST: {
        "default": process.env.URL_MAIN_APP || "http://localhost",
        description: "Server IP."
      }
    },
    PORT: {
      "default": process.env.PORT || 4000,
      description: "Application port."
    }
  }],
  apis: ["".concat(__dirname, "/../routes/user.routes.js")]
};
var _default = swaggerOptions;
exports["default"] = _default;