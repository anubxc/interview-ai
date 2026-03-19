const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const connectedtoDB = require("./src/config/database")


connectedtoDB()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})