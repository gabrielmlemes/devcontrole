"use client";

import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/tickets.type";
import { FiFile, FiCheckSquare } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

import toast from "react-hot-toast";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

const TicketItem = ({ ticket, customer }: TicketItemProps) => {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      await api.patch("/api/ticket", {
        id: ticket.id,
      });
      toast.success("Chamado fechado", {
        duration: 3000, // Duração do toast em ms
        position: "top-right", // Posição na tela
      });
      router.refresh();
    } catch (error) {
      toast.error("Erro ao atualizar o ticket.");
      console.log(error);
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket,
    });
  }

  return (
    <>
      <tr className="h-16 border-b-2 border-b-slate-200 bg-slate-100 duration-300 last:border-b-0 hover:bg-gray-200">
        <td className="pl-2 text-left">{customer?.name}</td>
        <td className="text-left">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="rounded bg-green-500 px-2 py-1 font-semibold">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-3">
            <FiCheckSquare
              size={22}
              color="#131313"
              onClick={handleChangeStatus}
            />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile size={22} color="blue" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default TicketItem;
