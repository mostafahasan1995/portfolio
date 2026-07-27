import { PrismaClient } from "@prisma/client";

/**
 * Lazily-created, globally-cached Prisma client.
 * Caching on globalThis avoids exhausting connections during Next.js hot
 * reloads in dev and across warm serverless invocations on Vercel.
 * The client is only constructed when a DB operation actually runs (i.e. when
 * DATABASE_URL is configured), so the app works fine without a database too.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}
