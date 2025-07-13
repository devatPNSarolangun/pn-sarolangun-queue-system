import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ketuaMajelisId = searchParams.get("ketuaMajelisId");

  try {
    const pidanas = await prisma.pidana.findMany({
      where: ketuaMajelisId
        ? { ketuaMajelisId: Number(ketuaMajelisId) } // assuming it's an int
        : {}, // no filter if not provided
      include: {
        ketuaMajelis: true,
        paniteraPengganti: true,
      },
    });

    return Response.json(pidanas);
  } catch (err) {
    return Response.json(
      { error: "Something went wrong", details: err.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const newPidana = await prisma.pidana.create({
      data: {
        nomorPerkara: data.nomorPerkara,
        jaksaPenuntutUmum: data.jaksaPenuntutUmum,
        terdakwa: data.terdakwa,
        keterangan: data.keterangan,
        ketuaMajelisId: parseInt(data.ketuaMajelisId),
        paniteraPenggantiId: parseInt(data.paniteraPenggantiId),
        ruangSidang: data.ruangSidang,
      },
    });
    return Response.json(newPidana);
  } catch (err) {
    return Response.json(
      { error: "Failed to create record", details: err.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
