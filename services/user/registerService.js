import "dotenv/config";
import jwt from "jsonwebtoken";
import { userRegister } from "../../repositories/user.js";

export default async (request) => {
  let user;

  try {
    user = await userRegister(request);
  } catch (err) {
    throw err;
  }
};
