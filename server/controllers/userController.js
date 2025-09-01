import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../modals/User.js";
import bcrypt from "bcryptjs"


export const signUp=async(req,res)=>{
        const {email,password,fullName,bio}=req.body;
       
        try{
            if(!email|| !password || !fullName || !bio)
            {
                return res.json({success:false,message:"Missing details"})
            }
            const user=await User.findOne({email});
            
            if(user){
                return res.json({success:false,message:"User Already Exist"})
            }
            
            const hashedPassword= await bcrypt.hash(password,10);
            

            const newUser=await User.create({email,fullName,bio,password:hashedPassword});
            const token=generateToken(newUser._id)
            return res.json({success:true,userData:newUser,token,message:"Account Created Successfully"})


        }
        catch(error){
                res.json({success:false,message:error.message});

        }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const  userData=await User.findOne({email})
         
        if(!userData._id){
            return res.json({success:false,message:"UserName cannot exist"})
        }
        const isPasswordCorrect=await bcrypt.compare(password,userData.password);
        if(!isPasswordCorrect){
            return res.json({success:false,message:"Password Incorrect"})
        }
        console.log(userData)
        const token=generateToken(userData._id);
        
       return res.json({success:true,userData,token,message:"Login Successfull"})
    }
 catch(error){
                res.json({success:false,message:error.message});

        }


}
export const  updateProfile=async(req,res)=>{
try{
    const {profilePic,bio,fullName}=req.body;
     
    const userId=req.user._id;
    
    let updatedUser;
    if(!profilePic){

        updatedUser=await User.findByAndUpdate(userId,{bio,fullName},{new:true})
    }else{
          console.log("hello")
            const upload= await cloudinary.uploader.upload(profilePic);
            
            const url= upload.secure_url;
      
        updatedUser=await User.findByIdAndUpdate(userId,{profilePic:url,bio,fullName},{new:true})
      return  res.json({success:true,user:updatedUser})
    }
}
catch(error){
res.json({success:false,message:error.message});
}

}