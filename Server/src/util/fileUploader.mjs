import { v2 as cloudinary } from "cloudinary";

export default function uploadFile(tempFilePath, fileName, folder) {
  console.log("Filename", fileName);
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("file after", process.env.CLOUDINARY_NAME);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      tempFilePath,
      {
        public_id: fileName,
        folder,
      },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.url);
      }
    );
  });

  // Upload

  //   const res = cloudinary.uploader.upload(tempFilePath, { public_id: "olympic_flag2" });

  //   res
  //     .then((data) => {
  //       console.log(data);
  //       console.log(data.secure_url);
  //       return data.secure_url;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
}
