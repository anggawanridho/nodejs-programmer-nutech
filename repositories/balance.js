import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const getBalance = async (email) => {
  try {
    const data = await prisma.balance.findUnique({
      where: {
        userEmail: email,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const topUpBalance = async (req) => {
  try {
    // Fetch the current balance
    const currentBalance = await prisma.balance.findUnique({
      where: {
        userEmail: req.user.email,
      },
      select: {
        balance: true,
      },
    });

    const newTotalAmount = currentBalance.balance + req.body.top_up_amount;

    const data = await prisma.$transaction([
      prisma.balance.update({
        where: {
          userEmail: req.user.email,
        },
        data: {
          balance: {
            increment: req.body.top_up_amount,
          },
        },
      }),
      prisma.transaction.create({
        data: {
          invoice_number: req.body.invoice_number,
          service_code: req.body.service_code,
          service_name: req.body.service_name,
          transaction_type: req.body.transaction_type,
          total_amount: newTotalAmount,
          created_on: new Date(),
          userEmail: req.user.email,
        },
      }),
    ]);

    return data[0];
  } catch (err) {
    throw err;
  }
};

export const payTransaction = async (req) => {
  try {
    // Fetch the current balance
    const currentBalance = await prisma.balance.findUnique({
      where: {
        userEmail: req.user.email,
      },
      select: {
        balance: true,
      },
    });

    const newTotalAmount = currentBalance.balance - req.body.total_amount;
    if (newTotalAmount < 0) {
      throw new Error("Saldo tidak mencukupi");
    }

    const data = await prisma.$transaction([
      prisma.balance.update({
        where: {
          userEmail: req.user.email,
        },
        data: {
          balance: {
            decrement: req.body.total_amount,
          },
        },
      }),
      prisma.transaction.create({
        data: {
          invoice_number: req.body.invoice_number,
          service_code: req.body.service_code,
          service_name: req.body.service_name,
          transaction_type: req.body.transaction_type,
          total_amount: newTotalAmount,
          created_on: new Date(),
          userEmail: req.user.email,
        },
      }),
    ]);

    return data[1];
  } catch (err) {
    throw err;
  }
};

export const getTransactionHistory = async (email, limit, offset) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userEmail: email,
      },
      orderBy: {
        created_on: "desc",
      },
      take: limit,
      skip: offset,
    });

    return transactions;
  } catch (err) {
    throw err;
  }
};
