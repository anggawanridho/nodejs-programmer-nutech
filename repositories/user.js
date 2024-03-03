import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const userRegister = async (request) => {
  let user;

  try {
    user = await prisma.user.create({
      data: {
        email: request.email,
        first_name: request.first_name,
        last_name: request.last_name,
        password: await bcrypt.hash(request.password, 10),
      },
    });
  } catch (err) {
    throw err;
  }

  return user;
};

export const userLogin = async (request) => {
  let data;
  try {
    data = await prisma.user.findFirst({
      where: {
        email: request.email,
      },
    });
  } catch (err) {
    throw err;
  }

  return data;
};

export const userProfiles = async (email) => {
  const data = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  delete data["password"];
  delete data["id"];

  return data;
};

export const userUpdate = async (request) => {
  let updatedUser;
  try {
    updatedUser = await prisma.user.update({
      where: {
        email: request.user.email,
      },
      data: request.data,
    });
  } catch (error) {
    throw error;
  }

  delete updatedUser["password"];
  delete updatedUser["id"];

  return updatedUser;
};
