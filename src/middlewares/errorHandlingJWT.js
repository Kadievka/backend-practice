require("dotenv").config();
import log4js from "log4js";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const errorHandlingJWT = (err, req, res, next) => {
  logger.info("[errorHandlingJWT] INIT");
  logger.info(`[errorHandlingJWT] err: ${err}`);

  if (err.name === "UnauthorizedError") {
    ResponseUtil.unauthorized(
      res,
      errors.UNAUTHORIZED,
      errors.UNAUTHORIZED_MESSAGE
    );
  }
  ResponseUtil.badRequest(res, errors.PROCESS_NOT_FINISHED, err.message);

  logger.info("[errorHandlingJWT] FINISH");
};

export default errorHandlingJWT;
