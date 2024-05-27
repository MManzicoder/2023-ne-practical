const {
  createUser,
  userLogin,
  getCurrentUser,
} = require("../controllers/user.controller");

const { auth } = require("../middlewares/auth.middleware");

module.exports = (app) => {
  var router = require("express").Router();

  router
    .route("/")
    /**
     * @swagger
     * /users:
     *   post:
     *     tags:
     *       - User
     *     description: User signup
     *     parameters:
     *       - name: body
     *         description: Fields for a user
     *         in: body
     *         required: true
     *         schema:
     *           properties:
     *            username:
     *              type: string
     *            password:
     *              type: string
     *            passwordConfirm:
     *              type: string
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .post(createUser);
  router
    .route("/current")
    /**
     * @swagger
     * /users/current:
     *   get:
     *     tags:
     *       - User
     *     description: Returns current User
     *     security:
     *       - bearerAuth: -[]
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .get([auth, getCurrentUser]);

  router
    .route("/login")
    /**
     * @swagger
     * /users/login:
     *   post:
     *     tags:
     *       - User
     *     description: User Login
     *     parameters:
     *       - name: body
     *         description: Fields for a user
     *         in: body
     *         required: true
     *         schema:
     *           properties:
     *            username:
     *              type: string
     *            password:
     *              type: string
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .post(userLogin);

  app.use("/api/users", router);
};
