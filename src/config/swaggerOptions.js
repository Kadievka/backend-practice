require("dotenv").config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend-Practice-Project",
      version: "0.1",
      description:
        "Back-end-Practice-Project exposed routes swagger documentation.",
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
    `${__dirname}/../routes/post.routes.js`,
    `${__dirname}/../routes/photo.routes.js`,
  ],
};

export default swaggerOptions;
