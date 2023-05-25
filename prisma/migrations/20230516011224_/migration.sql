/*
  Warnings:

  - Made the column `title_id` on table `dwd_switch_game_played_record` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title_name` on table `dwd_switch_game_played_record` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zh_name` on table `dwd_switch_game_played_record` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zh_cover` on table `dwd_switch_game_played_record` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_played_at` on table `dwd_switch_game_played_record` required. This step will fail if there are existing NULL values in that column.
  - Made the column `play_time` on table `dwd_switch_game_played_record` required. This step will fail if there are existing NULL values in that column.
  - Made the column `create_time` on table `dwd_switch_game_played_record` required. This step will fail if there are existing NULL values in that column.
  - Made the column `update_time` on table `dwd_switch_game_played_record` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `dwd_switch_game_played_record` MODIFY `title_id` VARCHAR(255) NOT NULL,
    MODIFY `title_name` VARCHAR(255) NOT NULL,
    MODIFY `zh_name` VARCHAR(255) NOT NULL,
    MODIFY `zh_cover` VARCHAR(255) NOT NULL,
    MODIFY `last_played_at` DATETIME(0) NOT NULL,
    MODIFY `play_time` INTEGER NOT NULL,
    MODIFY `create_time` DATETIME(0) NOT NULL,
    MODIFY `update_time` DATETIME(0) NOT NULL;
