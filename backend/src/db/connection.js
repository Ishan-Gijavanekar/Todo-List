import { dbName } from "../constants.js";
import mongoose from "mongoose";

const url = `mongodb+srv://isgsachin:doNMZXLyXSZXn1oN@todolist.0ux32.mongodb.net/${dbName}`

const connectDb = async() => {
    try{
        const connextionInstance = await mongoose.connect(url);
        console.log(`MongoDb connected on host ${connextionInstance.connection.host}`)
    }catch(error) {
        console.log("Error: ", error)
        process.exit(1)
    }
}

export {connectDb}