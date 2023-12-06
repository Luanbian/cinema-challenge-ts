/*
  Warnings:

  - Added the required column `passwordToken` to the `Employers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordTokenExpires` to the `Employers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employers` ADD COLUMN `passwordToken` CHAR(36) NOT NULL,
    ADD COLUMN `passwordTokenExpires` DATETIME(3) NOT NULL;
