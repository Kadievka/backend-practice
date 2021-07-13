// app nodejs
import express from "express";
import morgan from "morgan"; // Middleware de registrador de solicitudes HTTP
import cors from "cors"; // Cabeceras
import db from "./config/database";
import routes from "./routes";
import errorHandlingJWT from "./middlewares/errorHandlingJWT";

db.connect()
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Server express
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(
  cors({
    exposedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Accept-Language",
      "Authorization",
    ],
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
app.use(errorHandlingJWT);

export default app;
