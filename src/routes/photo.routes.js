import express from "express";
import jwtMiddleware from "express-jwt";
import createPhotoValidator from "../middlewares/createPhotoValidator";
import paginateValidator from "../middlewares/paginateValidator";
import {
  createPhoto,
  getOnePhotoByAuthor,
  getPhotosFromAPI,
} from "../controllers/photo.controller";

const router = express.Router();

/**
 * @swagger
 * /photos/:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Get all photos consuming jsonplaceholder API.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: page
 *         type: string
 *         description: page number we want to set.
 *         required: false
 *         default: 1
 *     responses:
 *       200:
 *         description: Returns data object with paginated photo docs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     docs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           albumId:
 *                             type: number
 *                             example: 1
 *                           id:
 *                             type: number
 *                             example: 1
 *                           title:
 *                             type: string
 *                             example: accusamus beatae ad facilis cum similique qui sunt
 *                           url:
 *                             type: string
 *                             example: http://placehold.it/600/92c952
 *                           thumbnail:
 *                             type: string
 *                             example: http://placehold.it/150/30ac17
 *                     total:
 *                       type: number
 *                       example: 5000
 *                     limit:
 *                       type: number
 *                       example: 10
 *                     page:
 *                       type: number
 *                       example: 1
 *                     pages:
 *                       type: number
 *                       example: 500
 *                 message:
 *                   type: string
 *                   example: Request successful
 *       401:
 *         description: Returns the unauthorized error when JWT is incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: boolean
 *                   example: Unauthorized access
 */
router
  .route("/")
  .post(
    jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    createPhotoValidator,
    createPhoto
  )
  .get(
    jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    paginateValidator,
    getPhotosFromAPI
  );

router
  .route("/:name")
  .get(
    jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    getOnePhotoByAuthor
  );

module.exports = router;
