import { PrismaClient } from "@prisma/client";

// 🛡️ Prevent multiple instances of Prisma in dev (important for Vercel)
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// ⚡ Tell Next.js this API route is dynamic (Vercel fix)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const ketuaMajelis = await prisma.ketuaMajelis.findMany();

    return new Response(JSON.stringify(ketuaMajelis), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("❌ Prisma error:", error);

    return new Response(
      JSON.stringify({
        error: "Something went wrong",
        details: error?.message || error,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
