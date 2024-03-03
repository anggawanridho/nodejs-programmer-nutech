import { userUpdate } from "../../repositories/user.js";
import cloudinary from "cloudinary";
import { randomUUID as uuid } from "crypto";
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export default async (request) => {
  let user;
  try {
    // Membuat objek kosong untuk menampung data baru
    const data = {};
    if (!request.file) {
      throw new Error("Tolong upload file gambar!");
    }

    if (
      request.file.mimetype !== "image/jpeg" &&
      request.file.mimetype !== "image/png"
    ) {
      throw new Error("Format Image tidak sesuai");
    }

    const imgBase64 = Buffer.from(request.file.buffer).toString("base64");
    const dataURI = `data:${request.file.mimetype};base64,${imgBase64}`;
    const uploadedImage = await cloudinary.v2.uploader.upload(dataURI, {
      folder: "img",
      public_id: `${request.file.originalname}-${uuid()}`,
    });

    request.data = {
      profile_image: uploadedImage.secure_url,
    };
    user = await userUpdate(request);
  } catch (err) {
    return err;
  }
  return user;
};
