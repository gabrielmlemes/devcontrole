import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import TicketItem from "./components/ticket";
import HeaderDescription from "./components/headerDescription";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main>
      <HeaderDescription name='Chamados' nameButton='Cadastrar' href="/dashboard/new"/>

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
