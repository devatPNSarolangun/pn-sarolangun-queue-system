import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Tell Next.js this API route is dynamic
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    // Delete all records from Pidana
    await prisma.pidana.deleteMany();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Pidana table reset successfully!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error resetting pidana:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
