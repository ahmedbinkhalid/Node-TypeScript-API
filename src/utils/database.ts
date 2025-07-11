import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Connected");
    } catch(error){
        console.error("MongoDB connection Error", error);
        process.exit(1);
    }   
}