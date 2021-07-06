require('dotenv').config();
import PhotoService from '../services/photo.service';
import ResponseUtil from '../utils/response';
import errors from '../utils/codeInternalErrors';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

async function createPhoto(req, res) {
    logger.info('[createPhoto controller] INIT');
    try {
        const photoToCreate = req.body;
        const userId = req.user.id;
        const photo = await PhotoService.createPhotoService(photoToCreate, userId);
        ResponseUtil.success(res, photo);
    } catch (error) {
        logger.error('[createPhoto controller] ERROR', error);
        ResponseUtil.badRequest(res, errors.PROCESS_NOT_FINISHED, error.message);
    }
    logger.info('[createPhoto controller] FINISHED');
}

async function getOnePhotoByAuthor(req, res) {
    logger.info('[createPhoto controller] INIT');
    try {
        const userId = req.user.id;
        const name = req.params.name;
        const photo = await PhotoService.getOnePhotoByAuthorService(name, userId);
        res.sendFile(photo.path);
    } catch (error) {
        logger.error('[createPhoto controller] ERROR', error);
        ResponseUtil.badRequest(res, errors.PROCESS_NOT_FINISHED, error.message);
    }
    logger.info('[createPhoto controller] FINISHED');
}

async function getPhotosByAuthor(req, res) {
    logger.info('[getPhotosByAuthor controller] INIT');
    try {
        const userId = req.user.id;
        const options = req.query;
        const photo = await PhotoService.getPhotosByAuthorService(userId, options);
        ResponseUtil.success(res, photo);
    } catch (error) {
        logger.error('[getPhotosByAuthor controller] ERROR', error);
        ResponseUtil.badRequest(res, errors.PROCESS_NOT_FINISHED, error.message);
    }
    logger.info('[getPhotosByAuthor controller] FINISHED');
}

async function getPhotosFromAPI(req, res) {
    logger.info('[getPhotosFromAPI controller] INIT');
    try {
        const options = req.query;
        const photos = await PhotoService.getPhotosFromAPIService(options);
        ResponseUtil.success(res, photos);
    } catch (error) {
        logger.error('[getPhotosFromAPI controller] ERROR', error);
        ResponseUtil.badRequest(res, errors.PROCESS_NOT_FINISHED, error.message);
    }
    logger.info('[getPhotosFromAPI controller] FINISHED');
}

export {
    createPhoto,
    getOnePhotoByAuthor,
    getPhotosByAuthor,
    getPhotosFromAPI
}