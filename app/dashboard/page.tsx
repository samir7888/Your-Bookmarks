import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { Redirect } from "@/components/Redirect";
import LinkCard from "@/components/LinkSection";
import CategorySelector from "@/components/CategorySelector";
import { fetchCategories } from "@/hooks/fetch-category";
import { fetchLinks } from "@/hooks/fetch-links";
import { CategoryType } from "@/types/category-type";
import { LinkType } from "@/types/links-type";
import Link from "next/link";
import LinkSection from "@/components/LinkSection";
import CategorySection from "@/components/ui/category-section";

export default async function DashboardPage() {
  const session = await getServerSession();
  const links = await fetchLinks();

  const categories = await fetchCategories();
  if (!session?.user) {
    return <Redirect to={"/"} />;
  }
  if (!links) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-white border-r hidden md:block space-y-4">
        <div>
          <CategorySection initialCategories={categories} />
        </div>
      </aside>

      {/* Main Content */}

      <main className="flex-1 p-6">
        <LinkSection categories={categories} initialLinks={links} />
      </main>
    </div>
  );
}
