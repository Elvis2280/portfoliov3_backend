/*
  Warnings:

  - You are about to drop the column `user_id` on the `blog_articles` table. All the data in the column will be lost.
  - You are about to drop the `resetpassword_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `owner` to the `blog_articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blog_articles" DROP CONSTRAINT "blog_articles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_user_id_fkey";

-- DropForeignKey
ALTER TABLE "resetpassword_tokens" DROP CONSTRAINT "resetpassword_tokens_user_id_fkey";

-- AlterTable
ALTER TABLE "blog_articles" DROP COLUMN "user_id",
ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "owner" TEXT NOT NULL;

-- DropTable
DROP TABLE "resetpassword_tokens";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "users";
