import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export const fetchLinks = async () => {
  const session = await getServerSession();
  const linksData = await prisma.link.findMany({
    where: { userEmail: session?.user?.email },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return linksData;
};
