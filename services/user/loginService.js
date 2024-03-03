import { userLogin } from "../../repositories/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async (request) => {
  let token;
  try {
    const data = await userLogin(request);
    if (!data) {
      throw new Error("Username atau password salah");
    }

    const match = await bcrypt.compare(request.password, data.password);
    if (!match) {
      throw new Error("Username atau password salah");
    } else {
      token = jwt.sign(
        {
          id: data.id,
          email: data.email,
          level: data.level,
          username: data.username,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      const response = {
        token: token,
      };

      return response;
    }
  } catch (err) {
    throw err;
  }
};
