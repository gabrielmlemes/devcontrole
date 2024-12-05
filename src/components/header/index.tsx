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
    <header className="flex h-20 w-full items-center bg-white px-2 py-4 shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link href="/">
          <h1 className="pl-1 text-2xl font-bold duration-300 hover:scale-105">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-center gap-3">
            <div className="hidden md:flex md:space-x-1">
              <p className="text-lg">Bem vindo(a) </p>{" "}
              <strong className="text-lg"> {data.user.name}</strong>
            </div>

            <Link href="/dashboard">
              <FiUser size={26} />
            </Link>

            <button onClick={handleSignOut}>
              <FiLogOut size={26} color="red" />
            </button>
          </div>
        )}

        {status == "unauthenticated" && (
          <div className="flex items-center gap-2">
            <p>Fazer login</p>

            <button onClick={handleSignIn}>
              <FiLock size={26} color="#4b5563" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
