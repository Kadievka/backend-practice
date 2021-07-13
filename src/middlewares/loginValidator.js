require("dotenv").config();
import Joi from "@hapi/joi";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const loginValidator = (req, res, next) => {
  logger.info("[loginValidator] INIT");

  const data = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(data);

  logger.info("[loginValidator] FINISH");
  error
    ? ResponseUtil.badRequest(
        res,
        errors.VALIDATION_FAILED,
        error.details[0].message
      )
    : next();
};

export default loginValidator;
