-- CreateTable
CREATE TABLE `dim_switch_game_play_history` (
    `titleId` VARCHAR(255) NULL,
    `titleName` VARCHAR(255) NULL,
    `deviceType` VARCHAR(255) NULL,
    `imageUrl` VARCHAR(255) NULL,
    `lastUpdatedAt` DATETIME(0) NULL,
    `firstPlayedAt` DATETIME(0) NULL,
    `lastPlayedAt` DATETIME(0) NULL,
    `totalPlayedDays` INTEGER NULL,
    `totalPlayedMinutes` INTEGER NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dwd_switch_game_played_record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_id` VARCHAR(255) NULL,
    `title_name` VARCHAR(255) NULL,
    `last_played_at` DATETIME(0) NULL,
    `play_time` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
