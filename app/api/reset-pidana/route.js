import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Tell Next.js this API route is dynamic
export const dynamic = "force-dynamic";

async function resetPidana() {
  try {
    await prisma.pidana.deleteMany();
    console.log("✅ All pidana records deleted");
    return Response.json({ success: true, message: "Pidana table reset" });
  } catch (error) {
    console.error("❌ Error resetting pidana:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST() {
  return resetPidana();
}

export async function GET() {
  return resetPidana(); // Allow browser testing
}
