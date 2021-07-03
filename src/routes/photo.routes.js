import express from 'express';
import jwtMiddleware from 'express-jwt';
import createPhotoValidator from '../middlewares/createPhotoValidator';
import paginateValidator from '../middlewares/paginateValidator';
import {
    createPhoto,
    getOnePhotoByAuthor,
    getPhotosByAuthor,
} from '../controllers/photo.controller';

const router = express.Router();

router.route('/')
    .post(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), createPhotoValidator, createPhoto)
    .get(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), paginateValidator, getPhotosByAuthor);

router.route('/:name')
    .get(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), getOnePhotoByAuthor);

    module.exports = router;