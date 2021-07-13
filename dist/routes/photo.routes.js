"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _createPhotoValidator = _interopRequireDefault(require("../middlewares/createPhotoValidator"));

var _paginateValidator = _interopRequireDefault(require("../middlewares/paginateValidator"));

var _photo = require("../controllers/photo.controller");

var router = _express["default"].Router();
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


router.route("/").post((0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
}), _createPhotoValidator["default"], _photo.createPhoto).get((0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
}), _paginateValidator["default"], _photo.getPhotosFromAPI);
router.route("/:name").get((0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
}), _photo.getOnePhotoByAuthor);
module.exports = router;