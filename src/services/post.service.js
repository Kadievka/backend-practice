import Post from "../models/Post";
import UserService from "./user.service";
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;


export default class PostService{
    static async createPost(postToCreate){
        return Post.create(postToCreate);
    }

    static async createPostService(postToCreate, userId){
        logger.debug(`[createPostService] INIT`);
        const user = await UserService.getUserById(userId, true);
        postToCreate.author = user._id;
        const post = this.createPost(postToCreate);
        logger.debug(`[createPostService] FINISH`);
        return post;
    }

    static getPostsByAuthorService(userId){
        return Post.find({
            author: userId
        }).select({
            _id: 1,
            title: 1,
            message: 1
        });
    }
}