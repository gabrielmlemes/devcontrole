import HeaderDescription from "../../components/headerDescription";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewCustomerForm from "../components/form";

const New = async () => {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect('/')
    }

  return (
    <>
      <HeaderDescription
        name="Novo Cliente"
        nameButton="Voltar"
        href="/dashboard/customer"
      />

      <main>
         <NewCustomerForm/>
      </main>
    </>
  );
};

export default New;
