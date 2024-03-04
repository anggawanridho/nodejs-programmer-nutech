import {
  getBalanceService,
  topUpService,
  paymentService,
  historyService,
} from "../services/transaction/index.js";

export const transanctionBalance = async (req, res) => {
  try {
    const data = await getBalanceService(req.user);
    return res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: data,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Terdapat error pada proses get balance",
      error: {
        message: err.message,
      },
    });
  }
};

export const transanctionTopUp = async (req, res) => {
  try {
    const data = await topUpService(req);
    return res.status(200).json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: data,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Terdapat error pada proses top up balance",
      error: {
        message: err.message,
      },
    });
  }
};

export const transanctionPayment = async (req, res) => {
  try {
    const data = await paymentService(req);
    return res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: data,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Service ataus Layanan tidak ditemukan",
      data: null,
    });
  }
};

export const transanctionHistory = async (req, res) => {
  try {
    const data = await historyService(req);
    return res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: data,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Terdapat error pada proses get history",
      error: {
        message: err.message,
      },
    });
  }
};
