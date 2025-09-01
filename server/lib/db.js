import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const password = process.env.DBPASSWORD;
const encodedPassword = encodeURIComponent(password);
export const connectDB=async()=>{
try{
    mongoose.connection.on("connected",()=>{console.log("Database connected")});
    await mongoose.connect(`mongodb+srv://${process.env.DBNAME}:${encodedPassword}@cluster0.v2loxcr.mongodb.net/chat-App`);
}
catch(error){
    console.log("connection error",error);
}

}
