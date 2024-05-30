CREATE DATABASE IF NOT EXISTS scoreshare;
USE scoreshare;

CREATE TABLE `Account` (
    `id` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `provider` VARCHAR(255) NOT NULL,
    `providerAccountId` VARCHAR(255) NOT NULL,
    `refresh_token` VARCHAR(255),
    `access_token` VARCHAR(255),
    `expires_at` INT,
    `token_type` VARCHAR(255),
    `scope` VARCHAR(255),
    `id_token` VARCHAR(255),
    `session_state` VARCHAR(255),

    PRIMARY KEY (`id`)
);

CREATE TABLE `User` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255),
    `email` VARCHAR(255),
    `emailVerified` TIMESTAMP(3),
    `password` VARCHAR(255),
    `role` VARCHAR(255) NOT NULL DEFAULT 'USER',
    `image` VARCHAR(255),

    PRIMARY KEY (`id`)
);

CREATE TABLE `VerificationToken` (
    `id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expires` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE `PasswordResetToken` (
    `id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expires` TIMESTAMP(3) NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE `Track` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `source` VARCHAR(255) NOT NULL,
    `date` TIMESTAMP(3) NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `tempo` INT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
);

CREATE TABLE `Artist` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `link` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE `File` (
    `id` VARCHAR(255) NOT NULL,
    `trackId` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `instrument` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `uploadedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `modifiedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
);

CREATE TABLE `Comment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `parentId` INT,
    `userId` VARCHAR(255) NOT NULL,
    `fileId` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
);

CREATE TABLE `VoteInComment` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `commentId` INT NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `vote` INT NOT NULL,
    `votedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
);

CREATE TABLE `VoteInFile` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `fileId` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `vote` INT NOT NULL,
    `votedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
);

CREATE TABLE `_ArtistToTrack` (
    `artistId` VARCHAR(100) NOT NULL,
    `trackId` VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX `Account_provider_providerAccountId_key` ON `Account`(`provider`, `providerAccountId`);

CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

CREATE UNIQUE INDEX `VerificationToken_token_key` ON `VerificationToken`(`token`);

CREATE UNIQUE INDEX `VerificationToken_email_token_key` ON `VerificationToken`(`email`, `token`);

CREATE UNIQUE INDEX `PasswordResetToken_token_key` ON `PasswordResetToken`(`token`);

CREATE UNIQUE INDEX `PasswordResetToken_email_token_key` ON `PasswordResetToken`(`email`, `token`);

CREATE UNIQUE INDEX `File_userId_name_instrument_key` ON `File`(`userId`, `name`, `instrument`);

CREATE UNIQUE INDEX `VoteInComment_userId_commentId_key` ON `VoteInComment`(`userId`, `commentId`);

CREATE UNIQUE INDEX `VoteInFile_userId_fileId_key` ON `VoteInFile`(`userId`, `fileId`);

CREATE UNIQUE INDEX `_ArtistToTrack_artistId_trackId_unique` ON `_ArtistToTrack`(`artistId`, `trackId`);

CREATE INDEX `_ArtistToTrack_trackId_index` ON `_ArtistToTrack`(`trackId`);

ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `File` ADD CONSTRAINT `File_trackId_fkey` FOREIGN KEY (`trackId`) REFERENCES `Track`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `File` ADD CONSTRAINT `File_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Comment` ADD CONSTRAINT `Comment_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `VoteInComment` ADD CONSTRAINT `VoteInComment_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `VoteInComment` ADD CONSTRAINT `VoteInComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `VoteInFile` ADD CONSTRAINT `VoteInFile_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `VoteInFile` ADD CONSTRAINT `VoteInFile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `_ArtistToTrack` ADD CONSTRAINT `_ArtistToTrack_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `_ArtistToTrack` ADD CONSTRAINT `_ArtistToTrack_trackId_fkey` FOREIGN KEY (`trackId`) REFERENCES `Track`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
