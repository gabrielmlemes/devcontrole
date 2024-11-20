import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import ClientTicket from "./components";

const Customer = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main>
      <div className="flex justify-between items-center w-full mt-9 mb-6">
        <h2 className="font-bold text-3xl">Meus clientes</h2>
        <Link
          href="/dashboard/customer/new"
          className="bg-[#3B82F6] font-semibold px-5 py-1 hover:scale-105 duration-300 text-white rounded-md "
        >
          Novo cliente
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3">
        <ClientTicket/>
        <ClientTicket/>
        <ClientTicket/>
      </div>
    </main>
  );
};

export default Customer;
