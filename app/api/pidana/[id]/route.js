// app/api/pidana/[id]/route.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const pidana = await prisma.pidana.findUnique({
      where: { id: parseInt(id) },
      include: {
        ketuaMajelis: true,
        paniteraPengganti: true,
      },
    });

    if (!pidana) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(pidana);
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch record", details: err.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const data = await req.json();
    const updatedPidana = await prisma.pidana.update({
      where: { id: parseInt(id) },
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

    return Response.json(updatedPidana);
  } catch (err) {
    return Response.json(
      { error: "Failed to update record", details: err.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.pidana.delete({
      where: { id: parseInt(id) },
    });

    return Response.json({ message: "Deleted successfully" });
  } catch (err) {
    return Response.json(
      { error: "Failed to delete record", details: err.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
