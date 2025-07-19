-- CreateTable
CREATE TABLE "Perdata" (
    "id" SERIAL NOT NULL,
    "nomorPerkara" TEXT NOT NULL,
    "penggugat" TEXT NOT NULL,
    "tergugat" TEXT NOT NULL,
    "keterangan" TEXT,
    "ruangSidang" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ketuaMajelisId" INTEGER NOT NULL,
    "paniteraPenggantiId" INTEGER NOT NULL,

    CONSTRAINT "Perdata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Perdata" ADD CONSTRAINT "Perdata_ketuaMajelisId_fkey" FOREIGN KEY ("ketuaMajelisId") REFERENCES "KetuaMajelis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perdata" ADD CONSTRAINT "Perdata_paniteraPenggantiId_fkey" FOREIGN KEY ("paniteraPenggantiId") REFERENCES "PaniteraPengganti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
