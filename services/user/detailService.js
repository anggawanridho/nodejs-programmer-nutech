import { userProfiles } from "../../repositories/user.js";

export default async (request) => {
  const email = request.email;
  const user = await userProfiles(email);

  return user;
};
