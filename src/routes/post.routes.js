import express from "express";
import jwtMiddleware from "express-jwt";
import createPostValidator from "../middlewares/createPostValidator";
import { createPost, getPostsFromAPI } from "../controllers/post.controller";

const router = express.Router();

router
  .route("/")
  .post(
    jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    createPostValidator,
    createPost
  )
  .get(
    jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getPostsFromAPI
  );

module.exports = router;
