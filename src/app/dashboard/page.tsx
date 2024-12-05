import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TicketItem from "./components/ticket";
import HeaderDescription from "./components/headerDescription";
import prisma from "@/lib/prisma";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const ticketData = await prisma.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO",
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <main>
      <HeaderDescription
        name="Chamados"
        nameButton="Cadastrar"
        href="/dashboard/new"
      />

      <table className="w-full">
        <thead>
          <tr>
            <th className="pl-1 text-left font-medium">CLIENTE</th>
            <th className="text-left font-medium">DATA CADASTRO</th>
            <th className="text-left font-medium">STATUS</th>
            <th className="text-left font-medium">#</th>
          </tr>
        </thead>

        <tbody>
          {ticketData.map((ticket) => (
            <TicketItem
              key={ticket.id}
              customer={ticket.customer}
              ticket={ticket}
            />
          ))}
        </tbody>
      </table>

      {ticketData.length === 0 && (
        <p className="mt-6 font-semibold text-gray-500">
          Você não possui nenhum chamado aberto!
        </p>
      )}
    </main>
  );
};

export default Dashboard;
