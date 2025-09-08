// lib/prisma.ts
import { prisma as prismaClient } from "./prisma-neon";

declare global {
    // allow global `var` for Prisma across hot reloads
    // eslint-disable-next-line no-var
    var prisma: typeof prismaClient | undefined;
}

export const prisma = global.prisma ?? prismaClient;

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
