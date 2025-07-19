// app/api/pidana/[id]/route.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const perdata = await prisma.perdata.findUnique({
      where: { id: parseInt(id) },
      include: {
        ketuaMajelis: true,
        paniteraPengganti: true,
      },
    });

    if (!perdata) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(perdata);
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
    const updatedPerdata = await prisma.perdata.update({
      where: { id: parseInt(id) },
      data: {
        nomorPerkara: data.nomorPerkara,
        penggugat: data.penggugat,
        tergugat: data.tergugat,
        keterangan: data.keterangan,
        ketuaMajelisId: parseInt(data.ketuaMajelisId),
        paniteraPenggantiId: parseInt(data.paniteraPenggantiId),
        ruangSidang: data.ruangSidang,
      },
    });

    return Response.json(updatedPerdata);
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
    await prisma.perdata.delete({
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
