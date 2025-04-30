import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

 const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database successfully");
    }catch(err){
        console.log("Error connecting to database",err);
    }
}

export default connectDB;