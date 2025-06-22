-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
