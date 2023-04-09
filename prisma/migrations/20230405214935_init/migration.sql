-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
