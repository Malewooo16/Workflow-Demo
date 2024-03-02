-- AlterTable
ALTER TABLE "users" ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "pictureURL" TEXT,
ADD COLUMN     "townAddress" TEXT,
ADD COLUMN     "validated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT;
