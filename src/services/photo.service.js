import Photo from "../models/Photo";
import UserService from "./user.service";
import defaultConstants from "../utils/defaultConstants";
import log4js from 'log4js';
import throwError from "../utils/throwError";
import errors from "../utils/codeInternalErrors";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;


export default class PhotoService{
    static async createPhoto(photoToCreate){
        return Photo.create(photoToCreate);
    }

    static async createPhotoService(photoToCreate, userId){
        logger.debug(`[createPhotoService] INIT`);
        const user = await UserService.getUserById(userId, true);
        photoToCreate.author = user._id;
        const photo = this.createPhoto(photoToCreate);
        logger.debug(`[createPhotoService] FINISH`);
        return photo;
    }

    static async getOnePhotoByAuthorService(name, userId){
        logger.debug(`[getOnePhotoByAuthorService] INIT`);
        let splittedName = name.split(".");
        const type = splittedName.pop();
        const photoName = splittedName.join(".");
        logger.debug(`[getOnePhotoByAuthorService] photoName: ${photoName}, type: ${type}, userId: ${userId}`);
        logger.debug(`[getOnePhotoByAuthorService] FINISH`);
        return this.getOnePhotoByNameTypeAndAuthor(photoName, type, userId, true);
    }

    static async getOnePhotoByNameTypeAndAuthor(name, type, userId, throwErrorIfNoExists = false){
        let photo = null;
        photo = await Photo.findOne({
            name: name,
            type: type,
            author: userId
        });
        if(!photo && throwErrorIfNoExists){
            throwError(errors.PHOTO_NO_FOUND, errors.PHOTO_NO_FOUND_MESSAGE);
        }
        return photo;
    }

    static getPhotosByAuthorService(userId, optionsRequest){
        logger.debug(`[getPhotosByAuthorService] INIT`);
        logger.debug(`[getPhotosByAuthorService] optionsRequest: ${JSON.stringify(optionsRequest)}`);
        const query = {
            author: userId
        };
        const options = {
            select: {},
            sort: { createdAt: optionsRequest.sort || -1 },
            page: optionsRequest.page || 1,
            limit: optionsRequest.limit || defaultConstants.PHOTOS_LIMIT_NUMBER,
        };
        logger.debug(`[getPhotosByAuthorService] FINISH`);
        return Photo.paginate(query, options);
    }
}