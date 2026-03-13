import cloudinary from "../config/cloudinary.config.js";
import streamifier from "streamifier";

export const uploadOnCloudinary = (fileBuffer, folder = "avatars") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
