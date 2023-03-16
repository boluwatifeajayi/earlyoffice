require('dotenv').config();
const mongoose = require("mongoose")
const DB = process.env.MONGO_URL

async function dbConnect () {
    try{
        await mongoose.connect(DB);
        console.log("Mongo Database is running")
    }catch(error){
        console.log(error)
    }
}
module.exports = dbConnect