const mongoose = require("mongoose")

async function ConnectToDB(){
    await mongoose.connect(process.env.MONGO_URI)

    console.log("connected to database")
}

module.exports = ConnectToDB