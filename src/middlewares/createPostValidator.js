require('dotenv').config();
import Joi from '@hapi/joi';
import ResponseUtil from '../utils/response';
import errors from '../utils/codeInternalErrors';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const createPostValidator = (req, res, next) => {
    logger.info('[createPostValidator] INIT');

    const data = req.body;

    const schema = Joi.object({
        title: Joi.string().max(30).required(),
        message: Joi.string().max(300).required()
    });

    const {
        error
    } = schema.validate(data);

    logger.info('[createPostValidator] FINISH');
    error
        ?
        ResponseUtil.badRequest(
            res,
            errors.VALIDATION_FAILED,
            error.details[0].message
        ) :
        next();
};

export default createPostValidator;