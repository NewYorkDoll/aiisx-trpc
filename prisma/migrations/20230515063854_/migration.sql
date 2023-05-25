-- CreateTable
CREATE TABLE `ent_types` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `type`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
CREATE TABLE `dim_switch_game_name_translate_man` (
    `title_id` VARCHAR(255) NULL,
    `zh_name` VARCHAR(255) NULL,
    `zh_cover` VARCHAR(255) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dwd_switch_game_played_record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_id` VARCHAR(255) NULL,
    `title_name` VARCHAR(255) NULL,
    `zh_name` VARCHAR(255) NULL,
    `zh_cover` VARCHAR(255) NULL,
    `last_played_at` DATETIME(0) NULL,
    `play_time` INTEGER NULL,
    `create_time` DATETIME(0) NULL,
    `update_time` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `github_events` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `event_id` VARCHAR(255) NOT NULL,
    `event_type` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL,
    `public` BOOLEAN NOT NULL DEFAULT false,
    `actor_id` BIGINT NOT NULL,
    `actor` JSON NOT NULL,
    `repo_id` BIGINT NOT NULL,
    `repo` JSON NOT NULL,
    `payload` JSON NOT NULL,

    UNIQUE INDEX `event_id`(`event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `github_repositories` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `repo_id` BIGINT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `owner_login` VARCHAR(255) NOT NULL,
    `owner` JSON NOT NULL,
    `public` BOOLEAN NOT NULL DEFAULT false,
    `html_url` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `fork` BOOLEAN NOT NULL DEFAULT false,
    `homepage` VARCHAR(255) NULL,
    `star_count` BIGINT NOT NULL DEFAULT 0,
    `default_branch` VARCHAR(255) NOT NULL,
    `is_template` BOOLEAN NOT NULL DEFAULT false,
    `has_issues` BOOLEAN NOT NULL DEFAULT true,
    `archived` BOOLEAN NOT NULL DEFAULT false,
    `pushed_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `license` JSON NULL,
    `label_github_repositories` BIGINT NULL,

    UNIQUE INDEX `repo_id`(`repo_id`),
    INDEX `github_repositories_labels_github_repositories`(`label_github_repositories`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `label_posts` (
    `label_id` BIGINT NOT NULL,
    `post_id` BIGINT NOT NULL,

    INDEX `label_posts_post_id`(`post_id`),
    PRIMARY KEY (`label_id`, `post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labels` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` TIMESTAMP(0) NOT NULL,
    `update_time` TIMESTAMP(0) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` TIMESTAMP(0) NOT NULL,
    `update_time` TIMESTAMP(0) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `content_html` TEXT NOT NULL,
    `summary` TEXT NOT NULL,
    `published_at` TIMESTAMP(0) NOT NULL,
    `view_count` BIGINT NOT NULL DEFAULT 0,
    `public` BOOLEAN NOT NULL DEFAULT false,
    `user_posts` BIGINT NOT NULL,

    UNIQUE INDEX `slug`(`slug`),
    INDEX `posts_users_posts`(`user_posts`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `create_time` TIMESTAMP(0) NOT NULL,
    `update_time` TIMESTAMP(0) NOT NULL,
    `user_id` BIGINT NOT NULL,
    `login` VARCHAR(255) NOT NULL,
    `name` VARCHAR(400) NULL,
    `avatar_url` VARCHAR(2048) NULL,
    `html_url` VARCHAR(2048) NULL,
    `email` VARCHAR(320) NULL,
    `location` VARCHAR(400) NULL,
    `bio` VARCHAR(400) NULL,

    UNIQUE INDEX `user_id`(`user_id`),
    UNIQUE INDEX `login`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `github_repositories` ADD CONSTRAINT `github_repositories_labels_github_repositories` FOREIGN KEY (`label_github_repositories`) REFERENCES `labels`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `label_posts` ADD CONSTRAINT `label_posts_label_id` FOREIGN KEY (`label_id`) REFERENCES `labels`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `label_posts` ADD CONSTRAINT `label_posts_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_users_posts` FOREIGN KEY (`user_posts`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
