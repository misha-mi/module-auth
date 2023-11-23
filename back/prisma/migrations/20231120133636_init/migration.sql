/*
  Warnings:

  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstUserId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondUserId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ChatToUser` DROP FOREIGN KEY `_ChatToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ChatToUser` DROP FOREIGN KEY `_ChatToUser_B_fkey`;

-- AlterTable
ALTER TABLE `Chat` ADD COLUMN `firstUserId` VARCHAR(191) NOT NULL,
    ADD COLUMN `secondUserId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_ChatToUser`;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_firstUserId_fkey` FOREIGN KEY (`firstUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_secondUserId_fkey` FOREIGN KEY (`secondUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
