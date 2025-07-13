import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const paniteraPengganti = await prisma.paniteraPengganti.findMany();
    return new Response(JSON.stringify(paniteraPengganti), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("❌ Prisma error:", error); // Log real error

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
  } finally {
    await prisma.$disconnect();
  }
}
