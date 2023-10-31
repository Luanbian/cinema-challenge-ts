-- CreateTable
CREATE TABLE `Movies` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `synopsis` VARCHAR(191) NOT NULL,
    `releaseDate` DATETIME(3) NOT NULL,
    `inTheaters` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
