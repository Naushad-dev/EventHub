import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";


const cloudinary_config = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      console.log("Please provide file");
      return null;
    }
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "event_mangement",
      transformation: [
        { fetch_formate: "auto" },
        { crop: "auto" },
        { quality: "auto" },
        { fill: "auto" },
      ],
    });
    // console.log("cloudinary response", response);
    if (response) {
      fs.unlinkSync(filePath);
    }
    return {
      url: response.secure_url, // Always use HTTPS
      public_id: response.public_id,
      format: response.format,
      bytes: response.bytes,
      created_at: response.created_at,
    };
  } catch (error) {
    console.log("Cloudinary Error", error);
    throw new Error(error.message);
  }
};
