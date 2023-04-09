/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Stores" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id")
);
