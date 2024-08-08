CREATE TABLE `user`(
    `id` BIGINT NOT NULL,
    `firstName` VARCHAR(255) NULL,
    `lastName` VARCHAR(255) NULL,
    `userName` VARCHAR(255) NOT NULL,
    `businessName` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NULL,
    `dateOfBirth` DATE NULL,
    `tel` BIGINT NULL,
    `isActive` TINYINT(1) NOT NULL DEFAULT '' 1 '',
    `isStaff` TINYINT(1) NOT NULL DEFAULT '' 0 '',
    `isAdmin` TINYINT(1) NOT NULL DEFAULT '' 0 '',
    `isBusiness` TINYINT(1) NOT NULL DEFAULT '' 0 '',
    `isPremium` TINYINT(1) NOT NULL DEFAULT '' 0 '',
    `taxNr` BIGINT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `future` VARCHAR(255) NULL,
    `createdAt` DATE NOT NULL,
    `updatedAt` DATE NOT NULL
);
ALTER TABLE
    `user` ADD INDEX `user_password_index`(`password`);
CREATE TABLE `ad`(
    `id` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `categoryId` BIGINT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NULL,
    `addressId` BIGINT NOT NULL,
    `price` BIGINT NOT NULL,
    `image` JSON NULL,
    `offerType` TINYINT(1) NOT NULL,
    `isPublish` TINYINT(1) NOT NULL DEFAULT '' 1 '',
    `countOfVisitors` BIGINT NOT NULL,
    `expireDate` DATE NOT NULL,
    `soldUserId` BIGINT NOT NULL,
    `soldDate` DATE NOT NULL,
    `isReserved` TINYINT(1) NOT NULL DEFAULT '' 0 '',
    `visitedUser` JSON NOT NULL,
    `future` VARCHAR(255) NOT NULL,
    `createdAt` DATE NOT NULL,
    `updatedAt` DATE NOT NULL
);
CREATE TABLE `favorite`(
    `id` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `adId` BIGINT NOT NULL,
    `createdAt` DATE NOT NULL,
    `updatedAt` DATE NOT NULL
);
CREATE TABLE `notification`(
    `id` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `followId` BIGINT NOT NULL,
    `favoriteId` BIGINT NOT NULL,
    `notificationType` VARCHAR(255) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `createdAt` DATE NOT NULL,
    `updatedAt` DATE NOT NULL
);
CREATE TABLE `follow`(
    `id` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `followUserId` BIGINT NOT NULL,
    `createdAt` DATE NOT NULL,
    `updatedAt` DATE NOT NULL
);
ALTER TABLE
    `user` ADD CONSTRAINT `user_id_foreign` FOREIGN KEY(`id`) REFERENCES `favorite`(`userId`);
ALTER TABLE
    `user` ADD CONSTRAINT `user_id_foreign` FOREIGN KEY(`id`) REFERENCES `notification`(`userId`);
ALTER TABLE
    `user` ADD CONSTRAINT `user_id_foreign` FOREIGN KEY(`id`) REFERENCES `follow`(`followUserId`);
ALTER TABLE
    `ad` ADD CONSTRAINT `ad_id_foreign` FOREIGN KEY(`id`) REFERENCES `favorite`(`adId`);
ALTER TABLE
    `user` ADD CONSTRAINT `user_id_foreign` FOREIGN KEY(`id`) REFERENCES `follow`(`userId`);
ALTER TABLE
    `favorite` ADD CONSTRAINT `favorite_id_foreign` FOREIGN KEY(`id`) REFERENCES `notification`(`favoriteId`);
ALTER TABLE
    `follow` ADD CONSTRAINT `follow_id_foreign` FOREIGN KEY(`id`) REFERENCES `notification`(`followId`);