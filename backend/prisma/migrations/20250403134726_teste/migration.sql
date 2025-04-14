/*
  Warnings:

  - A unique constraint covering the columns `[serverid]` on the table `Server` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "serverid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "server_unique" ON "Server"("serverid");
