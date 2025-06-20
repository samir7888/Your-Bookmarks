"use client"
import dynamic from "next/dynamic";

const LoginBtn = dynamic(() => import("./login-btn"), { ssr: false });

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 shadow">
      <div className="text-4xl font-bold">LinkNest</div>
      <LoginBtn />
    </div>
  );
}
