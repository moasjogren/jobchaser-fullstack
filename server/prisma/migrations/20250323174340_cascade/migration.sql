-- DropForeignKey
ALTER TABLE `SavedJob` DROP FOREIGN KEY `SavedJob_jobId_fkey`;

-- DropForeignKey
ALTER TABLE `SavedJob` DROP FOREIGN KEY `SavedJob_userId_fkey`;

-- DropIndex
DROP INDEX `SavedJob_jobId_fkey` ON `SavedJob`;

-- AddForeignKey
ALTER TABLE `SavedJob` ADD CONSTRAINT `SavedJob_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SavedJob` ADD CONSTRAINT `SavedJob_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
