import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"resumes",
        allowed_formats:["pdf","doc","docx"],
        resource_type:"raw",
    }
})

const upload = multer({storage});

export default upload;