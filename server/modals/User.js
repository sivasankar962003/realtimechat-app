import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    email:{type:String,required:true},
    fullName:{type:String,required:true},
    password:{type:String,required:true},
    profilePic:{type:String,default:""},
    bio:{type:String},
},{timestamps:true});

const User=mongoose.model?.Users || mongoose.model("User",userSchema);
export default User;