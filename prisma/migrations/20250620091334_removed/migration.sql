/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_title_key" ON "Link"("title");
