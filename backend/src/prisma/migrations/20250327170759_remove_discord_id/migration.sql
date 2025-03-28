/*
  Warnings:

  - You are about to drop the column `discordId` on the `Bot` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Bot_discordId_key";

-- AlterTable
ALTER TABLE "Bot" DROP COLUMN "discordId";
