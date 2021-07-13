"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _createPostValidator = _interopRequireDefault(require("../middlewares/createPostValidator"));

var _post = require("../controllers/post.controller");

var router = _express["default"].Router();
/**
 * @swagger
 * /posts/:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Get all posts consuming jsonplaceholder API.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns an array of posts objects.
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: number
 *                         example: 1
 *                       id:
 *                           type: number
 *                           example: 1
 *                       title:
 *                         type: string
 *                         example: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
 *                       _id:
 *                           type: number
 *                           example: 1
 *                       message:
 *                         type: string
 *                         example: quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto
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
}), _createPostValidator["default"], _post.createPost).get((0, _expressJwt["default"])({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
}), _post.getPostsFromAPI);
module.exports = router;