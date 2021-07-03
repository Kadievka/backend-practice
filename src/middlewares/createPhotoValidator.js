require('dotenv').config();
import Joi from '@hapi/joi';
import ResponseUtil from '../utils/response';
import errors from '../utils/codeInternalErrors';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const createPhotoValidator = (req, res, next) => {
    logger.info('[createPhotoValidator] INIT');

    const data = req.body;

    const schema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        path: Joi.string().required(),
        description: Joi.string(),
    });

    const {
        error
    } = schema.validate(data);

    logger.info('[createPhotoValidator] FINISH');
    error
        ?
        ResponseUtil.badRequest(
            res,
            errors.VALIDATION_FAILED,
            error.details[0].message
        ) :
        next();
};

export default createPhotoValidator;