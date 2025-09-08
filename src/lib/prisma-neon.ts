// lib/prisma-neon.ts
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";
import ws from "ws";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // optional: you can pass other pool settings here
});

// @ts-ignore
const adapter = new PrismaNeon(pool, { webSocket: ws });

// export Prisma client configured with the Neon adapter
export const prisma = new PrismaClient({ adapter });

// You can still do a global caching trick in dev if necessary
