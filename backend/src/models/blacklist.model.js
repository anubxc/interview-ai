const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        required:[true, "Token is required"],
        type:String,
    }
},{
    timestamps:true
})

const blacklistTokenModel = mongoose.model("blacklistTokens", blacklistTokenSchema)

module.exports = blacklistTokenModel