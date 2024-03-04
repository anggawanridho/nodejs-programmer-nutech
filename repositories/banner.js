import pg from "pg";
const { Pool } = pg;
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const getBanner = async (limit, offset) => {
  try {
    const banners = await prisma.banner.findMany({
      take: limit,
      skip: offset,
    });

    return banners;
  } catch (err) {
    throw err;
  }
};
