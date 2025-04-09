/*
  Warnings:

  - You are about to drop the `Analytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BotConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Command` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommandPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommandUsage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Server` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_botId_fkey";

-- DropForeignKey
ALTER TABLE "Bot" DROP CONSTRAINT "Bot_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Bot" DROP CONSTRAINT "Bot_serverId_fkey";

-- DropForeignKey
ALTER TABLE "BotConfig" DROP CONSTRAINT "BotConfig_botId_fkey";

-- DropForeignKey
ALTER TABLE "Command" DROP CONSTRAINT "Command_botId_fkey";

-- DropForeignKey
ALTER TABLE "CommandPermission" DROP CONSTRAINT "CommandPermission_commandId_fkey";

-- DropForeignKey
ALTER TABLE "CommandUsage" DROP CONSTRAINT "CommandUsage_commandId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_botId_fkey";

-- DropForeignKey
ALTER TABLE "Server" DROP CONSTRAINT "Server_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "createdAt" DROP DEFAULT;

-- DropTable
DROP TABLE "Analytics";

-- DropTable
DROP TABLE "Bot";

-- DropTable
DROP TABLE "BotConfig";

-- DropTable
DROP TABLE "Command";

-- DropTable
DROP TABLE "CommandPermission";

-- DropTable
DROP TABLE "CommandUsage";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Server";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
