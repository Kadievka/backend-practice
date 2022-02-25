import User from "../models/User";
import errors from "../utils/codeInternalErrors";
import throwError from "../utils/throwError";
import log4js from "log4js";
import jwt from "jsonwebtoken";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

export default class UserService {
  static async createUser(user) {
    return User.create(user);
  }

  static async createUserService(userToRegister) {
    logger.debug(`[createUserService] INIT`);
    userToRegister.email.toLowerCase();
    let user = await this.getUserByEmail(userToRegister.email);
    if (user) {
      throwError(
        errors.USER_ALREADY_EXISTS,
        errors.USER_ALREADY_EXISTS_MESSAGE
      );
    }
    user = await this.createUser(userToRegister);
    logger.debug(`[createUserService] FINISH`);
    return {
      _id: user._id,
      email: user.email,
    };
  }

  static async getUserByEmail(email) {
    return User.findOne({ email: email });
  }

  static async getUserById(id, throwErrorIfNoExists = false) {
    let user = null;
    user = await User.findById(id);
    if (!user && throwErrorIfNoExists) {
      throwError(errors.USER_NO_FOUND, errors.USER_NO_FOUND_MESSAGE);
    }
    return user;
  }

  static async loginService(userToLogin) {
    logger.debug(`[loginService] INIT`);
    userToLogin.email.toLowerCase();
    let user = await this.getUserByEmail(userToLogin.email);
    if (user) {
      const validPassword = await user.verifyPassword(userToLogin.password);
      if (validPassword) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        await this.saveToken(user, token);
        return {
          _id: user._id,
          email: user.email,
          jwt: token,
        };
      }
    }
    throwError(errors.UNAUTHORIZED, errors.UNAUTHORIZED_MESSAGE);
    logger.debug(`[loginService] FINISH`);
  }

  static async saveToken(user, token) {
    logger.debug(`[saveToken] INIT token: ${token}`);
    if(token){
      user.jwtAuthorization = token;
      await user.save();
    }
    logger.debug(`[saveToken] FINISH user: ${user}`);
  }
}
