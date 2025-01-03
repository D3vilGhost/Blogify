import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
export default async function uploadOnCloudinary(
  localFilePath,
  fileName,
  overwriteValue
) {
  // Configuration
  try {
    if (!localFilePath) {
      throw new Error("No File Path Available To Upload!");
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(localFilePath, {
        resource_type: "image",
        public_id: fileName,
        overwrite: overwriteValue,
      })
      .catch((error) => {
        throw new Error(error);
      });

    // console.log(uploadResult);

    // return only url of image
    return uploadResult.url;
  } catch (error) {
    console.log(`Error in uploadOnCloudinary: ${error.message}`);
    return null;
  } finally {
    // delete file from server
    fs.unlinkSync(localFilePath);
  }
}
