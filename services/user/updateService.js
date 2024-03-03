import { userUpdate } from "../../repositories/user.js";

export default async (request) => {
  let user;
  try {
    // Membuat objek kosong untuk menampung data baru
    const data = {};

    // Membuat array dari nama-nama field yang ingin diperbarui
    const fieldsToUpdate = [
      "email",
      "first_name",
      "last_name",
      "profile_picture",
    ];

    // Menggunakan forEach untuk memasukkan data dari request body
    fieldsToUpdate.forEach((fieldName) => {
      // Menguji masing-masing field di dalam body untuk dimasukkan ke dalam objek data
      if (request.body[fieldName]) {
        // Gunakan request.body[fieldName] untuk mengakses body dari request
        data[fieldName] = request.body[fieldName];
      }
    });
    request.data = data;
    user = await userUpdate(request);
  } catch (err) {
    return err;
  }
  return user;
};
