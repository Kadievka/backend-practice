require("dotenv").config();
import UserService from "../services/user.service";
import ResponseUtil from "../utils/response";
import errors from "../utils/codeInternalErrors";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

async function createUser(req, res) {
  logger.info("[createUser controller] INIT");
  try {
    const userToRegister = req.body;
    const user = await UserService.createUserService(userToRegister);
    ResponseUtil.success(res, user);
  } catch (error) {
    logger.error("[createUser controller] ERROR", error);
    ResponseUtil.badRequest(res, errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[createUser controller] FINISHED");
}

async function login(req, res) {
  logger.info("[login controller] INIT");
  try {
    const userToLogin = req.body;
    const user = await UserService.loginService(userToLogin);
    ResponseUtil.success(res, user);
  } catch (error) {
    logger.error("[login controller] ERROR", error);
    ResponseUtil.badRequest(res, errors.PROCESS_NOT_FINISHED, error.message);
  }

  logger.info("[login controller] FINISHED");
}

export { createUser, login };
