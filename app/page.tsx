import { Redirect } from "@/components/Redirect";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    <Redirect to="/dashboard" />;
  }
  return (
    <div className="min-h-screen min-w-7xl">
      <main className="flex flex-col  container mx-auto">
        <p className="text-lg">A Linktree for your Links landing page</p>
      </main>
    </div>
  );
}
