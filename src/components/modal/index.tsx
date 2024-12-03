"use client";

import { useContext, useRef, MouseEvent } from "react";
import { ModalContext } from "@/providers/modal";

const ModalCard = () => {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modal = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modal.current && !modal.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <section
      className="absolute min-h-screen w-full bg-gray-900/80"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modal}
          className="w-4/5 max-w-2xl rounded bg-white p-3 shadow-lg md:w-1/2"
        >
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-bold md:text-xl">
              Detalhes do chamado
            </h1>
            <button
              className="rounded bg-red-500 px-2 py-1 text-white"
              onClick={handleModalVisible}
            >
              Fechar
            </button>
          </div>

          <div className="flex flex-col flex-wrap gap-4">
            <span>
              <strong>Nome:</strong> {ticket?.ticket.name}
            </span>
            <span>
              <strong>Descrição:</strong> {ticket?.ticket.description}
            </span>
          </div>

          <div className="my-4 w-full border"></div>

          <h2 className="text-lg font-bold md:text-xl">Detalhes do cliente</h2>

          <div className="mt-4 flex flex-col gap-3">
            <div>
              <span className="font-bold">Nome: </span>
              <span>{ticket?.customer?.name}</span>
            </div>
            <div>
              <span className="font-bold">Telefone: </span>
              <span>{ticket?.customer?.phone}</span>
            </div>
            <div>
              <span className="font-bold">Email: </span>
              <span>{ticket?.customer?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalCard;
