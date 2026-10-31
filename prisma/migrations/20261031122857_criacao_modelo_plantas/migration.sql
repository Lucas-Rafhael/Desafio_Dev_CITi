/*
  Warnings:

  - You are about to drop the column `conta` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `documento` on the `User` table. All the data in the column will be lost.
  - Added the required column `especie` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estoque` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `luminosidade` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petFriendly` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regaACadaDias` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Luminosidade" AS ENUM ('SOMBRA', 'MEIA_SOMBRA', 'SOL_PLENO');

-- DropIndex
DROP INDEX "User_documento_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "conta",
DROP COLUMN "documento",
ADD COLUMN     "especie" TEXT NOT NULL,
ADD COLUMN     "estoque" INTEGER NOT NULL,
ADD COLUMN     "luminosidade" "Luminosidade" NOT NULL,
ADD COLUMN     "petFriendly" BOOLEAN NOT NULL,
ADD COLUMN     "preco" INTEGER NOT NULL,
ADD COLUMN     "regaACadaDias" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Conta";
