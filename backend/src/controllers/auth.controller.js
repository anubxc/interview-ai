const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * @name registerUserController
 * @route POST /api/auth/register
 * @description Register a new user, expect username, email and password in the request body
 * @access Public
 */


async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    const userExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }


    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name loginUserController
 * @route POST /api/auth/login
 * @description Login a user, expect email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {
    
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // ✅ FIXED COOKIE
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

/**
 * @name logoutUserController
 * @route GET /api/auth/logout
 * @description Logout a user by blacklisting the token and clearing the cookie
 * @access Public
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @route GET /api/auth/get-me
 * @description Get the logged in user's details
 * @access Private
 */

async function getMeController(req, res) {
    try {
        // ✅ Check if user exists in request
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user data"
            });
        }

        const user = await userModel.findById(req.user.id);

        // ✅ Check if user exists in DB
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User details retrieved successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("GetMe error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}