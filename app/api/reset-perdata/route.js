import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Tell Next.js this API route is dynamic
export const dynamic = "force-dynamic";

async function resetPerdata() {
  try {
    await prisma.perdata.deleteMany();
    return Response.json({ success: true, message: "Perdata table reset" });
  } catch (error) {
    console.error("❌ Error resetting perdata:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST() {
  return resetPerdata();
}

export async function GET() {
  return resetPerdata(); // Allow browser testing
}
