import { getTransactionHistory } from "../../repositories/balance.js";

export default async (request) => {
  try {
    const email = request.user.email;
    const limit = parseInt(request.query.limit) || undefined;
    const offset = parseInt(request.query.offset) || 0;

    const historyData = await getTransactionHistory(email, limit, offset);
    return {
      offset: offset,
      limit: limit,
      records: historyData,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching transaction history");
  }
};
