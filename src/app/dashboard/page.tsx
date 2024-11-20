import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import TicketItem from "./components/ticket";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main>
      <div className="flex justify-between items-center w-full mt-9 mb-6">
        <h2 className="font-bold text-3xl">Chamados</h2>
        <Link
          href="/dashboard/new"
          className="bg-[#3B82F6] font-semibold px-5 py-1 hover:scale-105 duration-300 text-white rounded-md "
        >
          Abrir chamado
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="font-medium text-left pl-1">CLIENTE</th>
            <th className="font-medium text-left">DATA CADASTRO</th>
            <th className="font-medium text-left">STATUS</th>
            <th className="font-medium text-left">#</th>
          </tr>
        </thead>

        <tbody>
          <TicketItem/>
        </tbody>
      </table>
    </main>
  );
};

export default Dashboard;
