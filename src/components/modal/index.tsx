"use client";

import { ModalContext } from "@/providers/modal";
import { type MouseEvent, useContext, useRef } from "react";

export function ModalTicket() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  function formatPhone(phone: string): string {
    const match = phone.match(/^(\(?\d{2}\)?\s?)?(\d{4,5})[-\s]?(\d{4})$/);

    if (!match) return phone; // retorna original se não bater

    const ddd = match[1]?.replace(/\D/g, "") || "";
    const parte1 = match[2];
    const parte2 = match[3];

    return ddd ? `(${ddd}) ${parte1}-${parte2}` : `${parte1}-${parte2}`;
  }

  return (
    <div className="absolute w-full bg-gray-900/80 min-h-screen" onClick={handleModalClick}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={modalRef} className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-lg md:text-2xl">Detalhes do chamado:</h1>
            <button
              className="bg-red-500 text-white px-2 p-1 rounded cursor-pointer"
              onClick={handleModalVisible}
            >
              <span>Fechar</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            <h2 className="font-bold">Nome:</h2>
            <p>{ticket?.ticket.name}</p>
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <h2 className="font-bold">Descrição:</h2>
            <p>{ticket?.ticket.description}</p>
          </div>

          <div className="w-full border-t-[1.5px] my-4 pt-4 border-gray-300">
            <h1 className="font-bold text-lg mb-4">Detalhes do cliente</h1>

            <div className="flex flex-wrap gap-1 mb-2">
              <h2 className="font-bold">Nome:</h2>
              <p>{ticket?.customer?.name}</p>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              <h2 className="font-bold">Telefone:</h2>
              <p>{ticket?.customer?.phone ? formatPhone(ticket.customer.phone) : ""}</p>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              <h2 className="font-bold">Email:</h2>
              <p>{ticket?.customer?.email}</p>
            </div>
            {ticket?.customer?.address && (
              <div className="flex flex-wrap gap-1 mb-2">
                <h2 className="font-bold">Endereço:</h2>
                <p>{ticket?.customer?.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
