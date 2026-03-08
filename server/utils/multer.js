import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    const ext = path.extname(file.originalname); // .pdf .doc .docx

    return {
      folder: "resumes",
      resource_type: "raw",
      allowed_formats: ["pdf", "doc", "docx"],
      public_id: `resume_${req.user.id}${ext}`,
      overwrite: true,
      access_mode: "public"
    };
  }
});

const upload = multer({ storage });

export default upload;