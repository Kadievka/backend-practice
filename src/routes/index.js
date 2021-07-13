require("dotenv").config();
import express from "express";

const app = express();

app.use(`/user`, require("./user.routes"));

app.use(`/photos`, require("./photo.routes"));

app.use(`/posts`, require("./post.routes"));

export default app;
