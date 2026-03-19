const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



/* require auth related routes */
const authRouter = require("./routes/auth.routes")


/* use auth related routes */
app.use("/api/auth",authRouter)


module.exports = app;