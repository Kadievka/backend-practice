require("dotenv").config();
import express from "express";

const app = express();

app.use(`/user`, require("./user.routes"));

export default app;
