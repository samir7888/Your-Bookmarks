  'use client';

  import { useSession, signIn, signOut } from "next-auth/react";
  import Image from "next/image";

  export default function LoginBtn() {
    const {data:session,status}= useSession();

    if (status === "loading") return <div>Loading...</div>;

    if (status === "authenticated") {
      return (
        <div className="flex gap-5 p-3 items-center">
          {/* <Image
            src={session?.user?.image || "/default-avatar.png"}
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          <button
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      );
    }

    return (
      <div className="p-3 flex">
        <button
          onClick={async () => {
            await signIn("google", { callbackUrl: "/dashboard" });
          }}
          className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
        >
          Sign in with Google
        </button>
        <button
          onClick={async () => {
            await signIn("github", { callbackUrl: "/dashboard" });
          }}
          className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
        >
          Sign in with Github
        </button>
      </div>
    );
  }
