const express = require('express');
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
*/

authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login a user with username and password
 * @access Public
*/

authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description Logout a user by blacklisting the token and clearing the cookie
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description Get the logged in user's details
 * @access Private
 */

authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)


module.exports = authRouter

