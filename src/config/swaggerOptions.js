require("dotenv").config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend-Practice-Project",
      version: "0.1",
      description:
        "Backend-Practice-Project exposed routes swagger documentation.",
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
  },
  servers: [
    {
      url: "http://{HOST}:{PORT}",
      description: "Route for general services",
      variables: {
        HOST: {
          default: process.env.URL_MAIN_APP || "http://localhost",
          description: "Server IP.",
        },
      },
      PORT: {
        default: process.env.PORT || 4000,
        description: "Application port.",
      },
    },
  ],
  apis: [`${__dirname}/../routes/user.routes.js`],
};

export default swaggerOptions;
