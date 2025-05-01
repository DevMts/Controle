"use client";

import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { z } from "zod";
import FormTicket from "./components/formticket";

const schema = z.object({
  email: z.string().min(1, "O email é obrigatório").email("Digite um email válido para localizar."),
});

type FormData = z.infer<typeof schema>;

export interface CardCustomerProps {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CardCustomerProps | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get(`/api/customer?email=${data.email}`);

    if (response.data.customer === null) {
      setError("email", { type: "custom", message: "Cliente nao encontrado" });
      return;
    }

    setCustomer({
      id: response.data.customer.id,
      name: response.data.customer.name,
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2 ">
      <h1 className="text-3xl font-bold text-center mt-24">Abrir Ticket</h1>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="bg-slate-200 py-6 px-2 rounded border-2 border-gray-300 flex items-center justify-between">
            <p className="">
              <strong>Cliente selecionado:</strong> {customer.name}
            </p>
            <button
              className="h-11 px-2 flex items-center justify-center cursor-pointer"
              onClick={handleClearCustomer}
            >
              <FiX size={30} color="#F00" />
            </button>
          </div>
        ) : (
          <form
            className="bg-slate-200 py-6 px-2 rounded border-2 border-gray-300"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-3">
              <div>
                <Input
                  placeholder="Digite o email do cliente"
                  type="text"
                  name="email"
                  register={register}
                  error={errors.email?.message}
                  className="border-gray-400"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-between gap-2 h-11 bg-blue-500 px-4 py-2 rounded text-white font-medium cursor-pointer"
              >
                <span>Procurar clientes</span>
                <FiSearch size={24} color="#fff" />
              </button>
            </div>
          </form>
        )}

        {customer && <FormTicket customer={customer} />}
      </main>
    </div>
  );
}
