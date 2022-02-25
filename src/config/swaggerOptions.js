require("dotenv").config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Technical Test",
      version: "0.1",
      description:
        "Kadievka Salcedo IMATIA Technical Test",
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
      url: `${process.env.URL_MAIN_APP}`,
      description: "Route for general services",
    },
  ],
  apis: [
    `${__dirname}/../routes/user.routes.js`,
  ],
};

export default swaggerOptions;
