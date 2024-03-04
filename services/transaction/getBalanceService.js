import { getBalance } from "../../repositories/balance.js";

export default async (request) => {
  const email = request.email;
  const user = await getBalance(email);
  delete user["id"];
  delete user["userEmail"];

  return user;
};
