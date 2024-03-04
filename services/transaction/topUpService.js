import { topUpBalance } from "../../repositories/balance.js";

export default async (request) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const transactionType = "TOPUP";
  request.body.invoice_number = `INV${day}${month}${year}-${String(
    transactionType
  ).padStart(3, "0")}`;
  request.body.transaction_type = transactionType;
  request.body.service_code = "PLN_PRABAYAR";
  request.body.service_name = "PLN Prabayar";
  const topupData = await topUpBalance(request);

  delete topupData["id"];
  delete topupData["userEmail"];
  return topupData;
};
