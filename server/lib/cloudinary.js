import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CDN,
    api_key:process.env.CDAPI ,
    api_secret:process.env.CDSECRET,

})
export default cloudinary;