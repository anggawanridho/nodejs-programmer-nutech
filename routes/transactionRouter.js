import express from "express";
import {
  transanctionBalance,
  transanctionTopUp,
  transanctionPayment,
  transanctionHistory,
} from "../controllers/transactionController.js";
import { verifyToken, updateMiddleware } from "../middlewares/index.js";

const router = express.Router();

/* GET balance listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// public routes
router.get("/balance", verifyToken, transanctionBalance);
router.post("/topup", [verifyToken, updateMiddleware], transanctionTopUp);
router.post(
  "/transaction",
  [verifyToken, updateMiddleware],
  transanctionPayment
);
router.get("/transaction/history", verifyToken, transanctionHistory);

export default router;
