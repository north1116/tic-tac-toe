// // import { PrismaClient } from "../src/generated/client"
// import { PrismaClient } from "@/generated/prisma/client"
// import { withAccelerate } from "@prisma/extension-accelerate"
 
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
// export const prisma =
//   globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())
 
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });
export { prisma };