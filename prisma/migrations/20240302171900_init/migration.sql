-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "townAddress" TEXT,
    "emailAddress" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "pictureURL" TEXT,
    "role" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "validateTkn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_emailAddress_key" ON "users"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "users_validateTkn_key" ON "users"("validateTkn");
