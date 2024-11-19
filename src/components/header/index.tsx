"use client";

import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data, status } = useSession();

  async function handleSignIn() {
    await signIn();
  }

  async function handleSignOut() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:scale-105 duration-300">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex gap-3 items-baseline">
            <Link href="/dashboard">
              <FiUser size={26} color="#2563EB" />
            </Link>

            <button onClick={handleSignOut}>
              <FiLogOut size={26} color="red" />
            </button>
          </div>
        )}

        {status == "unauthenticated" && (
          <button onClick={handleSignIn}>
            <FiLock size={26} color="#4b5563" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
