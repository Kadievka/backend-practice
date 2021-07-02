import express from 'express';
import createUserValidator from '../middlewares/createUserValidator';
import loginValidator from '../middlewares/loginValidator';
import {
    createUser,
    login
} from '../controllers/user.controller';

const router = express.Router();

router.route('/').post(createUserValidator, createUser);

router.route('/login').post(loginValidator, login);

module.exports = router;