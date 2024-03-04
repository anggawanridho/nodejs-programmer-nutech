import "dotenv/config";
import jwt from "jsonwebtoken";
import { userRegister } from "../../repositories/user.js";

export default async (request) => {
  try {
    const user = await userRegister(request);
  } catch (err) {
    throw err;
  }
};
