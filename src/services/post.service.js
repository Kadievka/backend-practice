import Post from "../models/Post";
import UserService from "./user.service";
import log4js from "log4js";
import fetch from "node-fetch";
import defaultConstants from "../utils/defaultConstants";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

export default class PostService {
  static async createPost(postToCreate) {
    return Post.create(postToCreate);
  }

  static async createPostService(postToCreate, userId) {
    logger.debug(`[createPostService] INIT`);
    const user = await UserService.getUserById(userId, true);
    postToCreate.author = user._id;
    const post = this.createPost(postToCreate);
    logger.debug(`[createPostService] FINISH`);
    return post;
  }

  static getPostsByAuthorService(userId) {
    return Post.find({
      author: userId,
    }).select({
      _id: 1,
      title: 1,
      message: 1,
    });
  }

  static async getPostsFromAPIService() {
    logger.info(`[getPostsFromAPI] :: INIT`);
    return fetch(`${process.env.JPH_API}/posts`)
      .then((response) => response.json())
      .then((json) =>
        json
          .map((item) => {
            item._id = item.id;
            item.message = item.body;
            item.body = undefined;
            return item;
          })
          .filter((item) => item.id < defaultConstants.POSTS_LIMIT_NUMBER)
      );
  }
}
