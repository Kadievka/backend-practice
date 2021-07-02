require('dotenv').config();
import PostService from '../services/post.service';
import ResponseUtil from '../utils/response';
import errors from '../utils/codeInternalErrors';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

async function createPost(req, res) {
    logger.info('[createPost controller] INIT');
    try {
        const postToCreate = req.body;
        const userId = req.user.id;
        const post = await PostService.createPostService(postToCreate, userId);
        ResponseUtil.success(res, post);
    } catch (error) {
        logger.error('[createPost controller] ERROR', error);
        ResponseUtil.badRequest(res, errors.PROCESS_NOT_FINISHED, error.message);
    }
    logger.info('[createPost controller] FINISHED');
}

async function getPostsByAuthor(req, res) {
    logger.info('[createPost controller] INIT');
    try {
        const userId = req.user.id;
        const post = await PostService.getPostsByAuthorService(userId);
        ResponseUtil.success(res, post);
    } catch (error) {
        logger.error('[createPost controller] ERROR', error);
        ResponseUtil.badRequest(res, errors.PROCESS_NOT_FINISHED, error.message);
    }
    logger.info('[createPost controller] FINISHED');
}

export {
    createPost,
    getPostsByAuthor
}