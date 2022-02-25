require("dotenv").config();
import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";
import defaultConstants from "../utils/defaultConstants";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const paginateValidator = (req, res, next) => {
  logger.info("[paginateValidator] INIT");

  const data = req.query;

  logger.info(`[paginateValidator] data: ${JSON.stringify(data)}`);

  if (data.sort) {
    data.sort = data.sort.toUpperCase();
    data.sort = data.sort === defaultConstants.ASC ? 1 : -1;
  } else {
    data.sort = -1;
  }

  data.page = data.page ? parseInt(data.page) : 1;
  data.limit = data.limit
    ? parseInt(data.limit)
    : defaultConstants.PAGINATE_LIMIT_NUMBER;

  let validValuesToSort = [-1, 1];

  const schema = Joi.object({
    sort: Joi.number().valid(...validValuesToSort),
    page: Joi.number().integer(),
    limit: Joi.number().integer(),
  });

  const { error } = schema.validate(data);

  logger.info("[paginateValidator] FINISH");
  error
    ? ResponseUtil.badRequest(
        res,
        errors.VALIDATION_FAILED,
        error.details[0].message
      )
    : next();
};

export default paginateValidator;
