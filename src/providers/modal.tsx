"use client";

import { ModalTicket } from "@/components/modal";
import type { CardCustomerProps } from "@/utils/customer.type";
import type { TicketProps } from "@/utils/ticket.type";
import { createContext, useState } from "react";

interface ModalContextProps {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setDetailTicket: (ticket: TicketInfo) => void;
}

interface TicketInfo {
  ticket: TicketProps;
  customer: CardCustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextProps);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  const handleModalVisible = () => {
    setVisible(!visible);
  };

  function setDetailTicket(ticket: TicketInfo) {
    setTicket(ticket);
    console.log(ticket);
  }

  return (
    <ModalContext.Provider value={{ visible, handleModalVisible, ticket, setDetailTicket }}>
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
};
