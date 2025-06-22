import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export const fetchCategories = async () => {
    const session = await getServerSession();
  const categories = await prisma.category.findMany({
    where: { userEmail: session?.user?.email },
  });
  return categories; 
};
