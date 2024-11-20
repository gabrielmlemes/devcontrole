import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import ClientTicket from "./components";
import HeaderDescription from "../components/headerDescription";

const Customer = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main>
      <HeaderDescription name='Meus clientes' nameButton='Novo cliente'/>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3">
        <ClientTicket/>
        <ClientTicket/>
        <ClientTicket/>
      </div>
    </main>
  );
};

export default Customer;
