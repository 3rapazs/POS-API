-- CreateTable
CREATE TABLE "Teste" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'use',
    "foodTypeId" INTEGER NOT NULL,

    CONSTRAINT "Teste_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Teste" ADD CONSTRAINT "Teste_foodTypeId_fkey" FOREIGN KEY ("foodTypeId") REFERENCES "FoodType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
