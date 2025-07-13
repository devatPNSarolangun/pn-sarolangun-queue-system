-- CreateTable
CREATE TABLE "Pidana" (
    "id" SERIAL NOT NULL,
    "nomorPerkara" TEXT NOT NULL,
    "jaksaPenuntutUmum" TEXT NOT NULL,
    "terdakwa" TEXT NOT NULL,
    "keterangan" TEXT,
    "ketuaMajelisId" INTEGER NOT NULL,
    "paniteraPenggantiId" INTEGER NOT NULL,
    "ruangSidang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pidana_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pidana" ADD CONSTRAINT "Pidana_ketuaMajelisId_fkey" FOREIGN KEY ("ketuaMajelisId") REFERENCES "KetuaMajelis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pidana" ADD CONSTRAINT "Pidana_paniteraPenggantiId_fkey" FOREIGN KEY ("paniteraPenggantiId") REFERENCES "PaniteraPengganti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
