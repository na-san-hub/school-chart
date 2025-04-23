import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 開発環境では global を利用し、再接続を避ける
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // ログレベルをエラーだけに制限してオーバーヘッドを減らす
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
